import { backupDatabase, cleanOldBackups } from './backup-database';
import { uploadToGoogleDrive, cleanOldDriveBackups } from './upload-to-drive';

/**
 * Script completo: Backup + Upload para Google Drive
 */
async function runBackupAndUpload(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🔄 BACKUP AUTOMÁTICO DO BANCO DE DADOS');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`⏰ Horário: ${new Date().toLocaleString('pt-BR')}`);
  console.log('═══════════════════════════════════════════════════════\n');

  try {
    // Passo 1: Criar backup
    const backupFilePath = await backupDatabase();

    // Passo 2: Limpar backups locais antigos
    cleanOldBackups(7);

    // Passo 3: Upload para Google Drive
    await uploadToGoogleDrive(backupFilePath);

    // Passo 4: Limpar backups antigos do Drive
    await cleanOldDriveBackups(7);

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ BACKUP CONCLUÍDO COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════');

    process.exit(0);
  } catch (error: any) {
    console.error('\n═══════════════════════════════════════════════════════');
    console.error('❌ ERRO NO PROCESSO DE BACKUP');
    console.error('═══════════════════════════════════════════════════════');
    console.error('Detalhes:', error.message);
    console.error('\n💡 Verifique:');
    console.error('   - MySQL está rodando');
    console.error('   - Credenciais do banco estão corretas');
    console.error('   - Arquivo de credenciais do Google existe');
    console.error('   - Permissões de escrita no diretório');
    console.error('═══════════════════════════════════════════════════════\n');

    process.exit(1);
  }
}

// Executa o processo completo
runBackupAndUpload();
