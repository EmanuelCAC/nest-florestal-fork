import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { backupDatabase, cleanOldBackups } from 'scripts/backup-database';
import * as fs from 'fs';
import * as path from 'path';
import { uploadToGoogleDriveOAuth } from 'scripts/upload-oauth';
import { encryptFile, decryptFile } from '../util/crypto.util';
import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from 'dotenv';

config();

const execAsync = promisify(exec);

interface BackupConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  /**
   * Extrai configurações do banco de dados da DATABASE_URL
   */
  private parseDatabaseUrl(url: string): BackupConfig {
    const regex = /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/;
    const match = url.match(regex);

    if (!match) {
      throw new Error('DATABASE_URL inválida');
    }

    return {
      user: match[1],
      password: match[2],
      host: match[3],
      port: match[4],
      database: match[5],
    };
  }

  /**
   * Tenta encontrar o mysql em locais comuns do Windows
   */
  private findMysql(): string | null {
    const possiblePaths = [
      'C:\\Program Files\\MySQL\\MySQL Server 8.4\\bin\\mysql.exe',
      'C:\\Program Files\\MySQL\\MySQL Server 8.3\\bin\\mysql.exe',
      'C:\\Program Files\\MySQL\\MySQL Server 8.2\\bin\\mysql.exe',
      'C:\\Program Files\\MySQL\\MySQL Server 8.1\\bin\\mysql.exe',
      'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe',
      'C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql.exe',
      'C:\\Program Files (x86)\\MySQL\\MySQL Server 8.4\\bin\\mysql.exe',
      'C:\\Program Files (x86)\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe',
      'C:\\xampp\\mysql\\bin\\mysql.exe',
      'C:\\wamp64\\bin\\mysql\\mysql8.0.31\\bin\\mysql.exe',
      'C:\\wamp\\bin\\mysql\\mysql5.7.31\\bin\\mysql.exe',
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        this.logger.log(`mysql encontrado em: ${p}`);
        return p;
      }
    }

    return null;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    try {
      // Criar backup
      const backupFilePath = await backupDatabase();
      
      // Criptografar o backup
      this.logger.log('Criptografando backup...');
      const encryptedPath = encryptFile(backupFilePath);
      this.logger.log(`Backup criptografado salvo em: ${encryptedPath}`);
      
      // Remove o arquivo não criptografado
      fs.unlinkSync(backupFilePath);
      this.logger.log('Arquivo não criptografado removido');

      // Detectar tipo de autenticação e faz upload
      try {
        const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || './google-credentials.json';
        const fullPath = path.join(process.cwd(), credentialsPath);
        
        if (fs.existsSync(fullPath)) {
          const credentials = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
          
          // Usa OAuth
          console.log('\nUsando autenticação OAuth 2.0');
          
          await uploadToGoogleDriveOAuth(encryptedPath);
          
          // Remove o backup local após upload bem-sucedido
          fs.unlinkSync(encryptedPath);
          this.logger.log('Backup criptografado removido após upload');
          
        } else {
          console.log('\nArquivo de credenciais não encontrado');
          console.log('Backup local criado, mas não será mantido.\n');
          // Remove o backup mesmo sem upload
          fs.unlinkSync(encryptedPath);
          this.logger.log('Backup criptografado removido');
        }
        
      } catch (uploadError: any) {
        console.error('\nErro no upload:', uploadError.message);
        // Remove o backup mesmo em caso de erro
        if (fs.existsSync(encryptedPath)) {
          fs.unlinkSync(encryptedPath);
          this.logger.log('Backup criptografado removido após erro no upload');
        }
      
      }

      process.exit(0);
    } catch (error: any) {
      console.error('Erro no processo de backup:', error.message);
      process.exit(1);
    }
  }

  /**
   * Restaura o banco de dados a partir de um backup criptografado
   * @param encryptedBackupPath Caminho do arquivo de backup criptografado
   */
  async restoreFromEncryptedBackup(encryptedBackupPath: string): Promise<void> {
    try {
      this.logger.log('Iniciando restauração do banco de dados...');

      // Verifica se o arquivo existe
      if (!fs.existsSync(encryptedBackupPath)) {
        throw new Error(`Arquivo de backup não encontrado: ${encryptedBackupPath}`);
      }

      // Descriptografa o backup
      this.logger.log('Descriptografando backup...');
      const decryptedPath = decryptFile(encryptedBackupPath);
      this.logger.log(`Backup descriptografado em: ${decryptedPath}`);

      // Obtém configurações do banco de dados
      const databaseUrl = process.env.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error('DATABASE_URL não encontrada no .env');
      }

      const config = this.parseDatabaseUrl(databaseUrl);

      // Tenta encontrar o mysql
      this.logger.log('Procurando mysql...');
      const mysqlPath = this.findMysql();

      let command: string;

      if (mysqlPath) {
        // Usa o caminho completo encontrado
        command = `"${mysqlPath}" --default-auth=mysql_native_password -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} ${config.database} < "${decryptedPath}"`;
      } else {
        // Tenta usar do PATH
        this.logger.log('mysql não encontrado nos caminhos padrão');
        this.logger.log('Tentando usar mysql do PATH...');
        command = `mysql --default-auth=mysql_native_password -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} ${config.database} < "${decryptedPath}"`;
      }

      this.logger.log('Executando restauração...');
      await execAsync(command);

      // Remove o arquivo descriptografado temporário
      fs.unlinkSync(decryptedPath);
      this.logger.log('Arquivo descriptografado temporário removido');

      this.logger.log('✓ Banco de dados restaurado com sucesso!');
    } catch (error: any) {
      this.logger.error('Erro ao restaurar banco de dados:', error.message);
      throw error;
    }
  }
}