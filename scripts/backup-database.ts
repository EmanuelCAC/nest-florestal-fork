import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

const execAsync = promisify(exec);

// Carrega variáveis de ambiente
config();

interface BackupConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

/**
 * Extrai configurações do banco de dados da DATABASE_URL
 */
function parseDatabaseUrl(url: string): BackupConfig {
  // Formato: mysql://user:password@host:port/database?params
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
 * Tenta encontrar o mysqldump em locais comuns do Windows
 */
function findMysqldump(): string | null {
  // PRIORIDADE: MySQL oficial > XAMPP/WAMP
  const possiblePaths = [
    // MySQL oficial (instalação padrão) - PRIORIDADE ALTA
    'C:\\Program Files\\MySQL\\MySQL Server 8.4\\bin\\mysqldump.exe',
    'C:\\Program Files\\MySQL\\MySQL Server 8.3\\bin\\mysqldump.exe',
    'C:\\Program Files\\MySQL\\MySQL Server 8.2\\bin\\mysqldump.exe',
    'C:\\Program Files\\MySQL\\MySQL Server 8.1\\bin\\mysqldump.exe',
    'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe',
    'C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqldump.exe',
    'C:\\Program Files (x86)\\MySQL\\MySQL Server 8.4\\bin\\mysqldump.exe',
    'C:\\Program Files (x86)\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe',
    // XAMPP/WAMP (última opção) - PRIORIDADE BAIXA
    'C:\\xampp\\mysql\\bin\\mysqldump.exe',
    'C:\\wamp64\\bin\\mysql\\mysql8.0.31\\bin\\mysqldump.exe',
    'C:\\wamp\\bin\\mysql\\mysql5.7.31\\bin\\mysqldump.exe',
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      console.log(`mysqldump encontrado em: ${p}`);
      return p;
    }
  }

  return null;
}

/**
 * Cria o diretório de backups se não existir
 */
function ensureBackupDirectory(): string {
  const backupDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  return backupDir;
}

/**
 * Gera nome do arquivo de backup com timestamp
 */
function generateBackupFilename(database: string): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .split('.')[0]; // Remove milissegundos
  return `${database}_backup_${timestamp}.sql`;
}

/**
 * Executa o backup do banco de dados MySQL usando mysqldump
 */
async function backupDatabase(): Promise<string> {
  try {
    console.log('Iniciando backup do banco de dados...');

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL não encontrada no .env');
    }

    const config = parseDatabaseUrl(databaseUrl);
    const backupDir = ensureBackupDirectory();
    const filename = generateBackupFilename(config.database);
    const filepath = path.join(backupDir, filename);

    console.log(`Diretório de backup: ${backupDir}`);
    console.log(`Arquivo de backup: ${filename}`);

    // Tenta encontrar mysqldump
    console.log('Procurando mysqldump...');
    const mysqldumpPath = findMysqldump();

    let command: string;

    if (mysqldumpPath) {
      // Usa o caminho completo encontrado com --default-auth para compatibilidade
      command = `"${mysqldumpPath}" --default-auth=mysql_native_password -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} ${config.database} > "${filepath}"`;
    } else {
      // Tenta usar do PATH
      console.log('mysqldump não encontrado nos caminhos padrão');
      console.log('Tentando usar mysqldump do PATH...');
      command = `mysqldump --default-auth=mysql_native_password -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} ${config.database} > "${filepath}"`;
    }

    console.log('Executando mysqldump...');
    await execAsync(command);

    // Verifica se o arquivo foi criado
    if (!fs.existsSync(filepath)) {
      throw new Error('Arquivo de backup não foi criado');
    }

    const stats = fs.statSync(filepath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(` Backup criado com sucesso!`);

    return filepath;
  } catch (error: any) {
    console.error('Erro ao criar backup:', error.message);
    
    // Mensagem de ajuda se mysqldump não for encontrad
    if (error.message.includes('reconhecido') || error.message.includes('not found')) {
      console.error(' O mysqldump não foi encontrado no seu sistema.');
      console.error(' Por favor, informe o caminho da instalação do MySQL.');
    }
    
    throw error;
  }
}

/**
 * Remove backups antigos (mantém apenas os últimos N backups)
 */
function cleanOldBackups(keepCount: number = 7): void {
  try {
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      return;
    }

    const files = fs
      .readdirSync(backupDir)
      .filter((file) => file.endsWith('.sql'))
      .map((file) => ({
        name: file,
        path: path.join(backupDir, file),
        time: fs.statSync(path.join(backupDir, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    // Remove backups mais antigos
    if (files.length > keepCount) {
      console.log(`Removendo backups antigos (mantendo ${keepCount} mais recentes)...`);
      
      const toDelete = files.slice(keepCount);
      toDelete.forEach((file) => {
        fs.unlinkSync(file.path);
        console.log(`   Removido: ${file.name}`);
      });
      
      console.log(`${toDelete.length} backup(s) antigo(s) removido(s)`);
    }
  } catch (error) {
    console.error('Erro ao limpar backups antigos:', error);
  }
}

// Executa o backup se for chamado diretamente
if (require.main === module) {
  backupDatabase()
    .then((filepath) => {
      cleanOldBackups(7); // Mantém últimos 7 backups
      console.log('\n Processo de backup concluído!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n Falha no backup:', error.message);
      process.exit(1);
    });
}

export { backupDatabase, cleanOldBackups };
