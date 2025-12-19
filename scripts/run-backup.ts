import { backupDatabase, cleanOldBackups } from './backup-database';
import { uploadToGoogleDriveOAuth } from './upload-oauth';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Script completo: Backup + Upload para Google Drive
 */
async function runBackupAndUpload(): Promise<void> {

  try {
    // Criar backup
    const backupFilePath = await backupDatabase();

    // Limpar backups locais antigos
    cleanOldBackups(7);

    // Detectar tipo de autenticação e faz upload
    try {
      const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || './google-credentials.json';
      const fullPath = path.join(process.cwd(), credentialsPath);
      
      if (fs.existsSync(fullPath)) {
        const credentials = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        
          // Usa OAuth
          console.log('\nUsando autenticação OAuth 2.0');
          
          await uploadToGoogleDriveOAuth(backupFilePath);
        
      } else {
        console.log('\nArquivo de credenciais não encontrado');
        console.log('Backup local criado, mas upload foi pulado.\n');
      }
      
    } catch (uploadError: any) {
      console.error('\nErro no upload:', uploadError.message);
      console.log('Backup local salvo com sucesso!');
    
    }

    process.exit(0);
  } catch (error: any) {
    console.error('Erro no processo de backup:', error.message);
    process.exit(1);
  }
}

// Executa o processo completo
runBackupAndUpload();
