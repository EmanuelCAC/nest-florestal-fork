import { backupDatabase, cleanOldBackups } from './backup-database';
import { uploadToGoogleDrive, cleanOldDriveBackups } from './upload-to-drive';

/**
 * Script completo: Backup + Upload para Google Drive
 */
async function runBackupAndUpload(): Promise<void> {

  try {
    // Passo 1: Criar backup
    const backupFilePath = await backupDatabase();

    // Passo 2: Limpar backups locais antigos
    cleanOldBackups(7);

    // Passo 3: Upload para Google Drive
    await uploadToGoogleDrive(backupFilePath);

    // Passo 4: Limpar backups antigos do Drive
    await cleanOldDriveBackups(7);

    process.exit(0);
  } catch (error: any) {
    console.error('Erro no processo de backup e upload:', error.message);

    process.exit(1);
  }
}

// Executa o processo completo
runBackupAndUpload();
