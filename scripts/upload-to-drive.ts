import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

/**
 * Faz upload de um arquivo para o Google Drive
 */
async function uploadToGoogleDrive(filePath: string): Promise<void> {
  try {
    console.log('\nIniciando upload para Google Drive...');

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }

    // Verifica credenciais
    const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH;
    if (!credentialsPath) {
      throw new Error('GOOGLE_CREDENTIALS_PATH não definida no .env');
    }

    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`Arquivo de credenciais não encontrado: ${credentialsPath}`);
    }

    // Carrega as credenciais
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

    // Cria cliente de autenticação
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Informações do arquivo
    const fileName = path.basename(filePath);
    const fileSize = fs.statSync(filePath).size;
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

    console.log(`Arquivo: ${fileName}`);
    console.log(`Tamanho: ${fileSizeMB} MB`);

    // ID da pasta do Drive (se especificada)
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Metadados do arquivo
    const fileMetadata: any = {
      name: fileName,
      mimeType: 'application/sql',
    };

    // Se houver pasta especificada, adiciona
    if (folderId) {
      fileMetadata.parents = [folderId];
      console.log(`📁 Pasta de destino: ${folderId}`);
    }

    // Cria stream do arquivo
    const media = {
      mimeType: 'application/sql',
      body: fs.createReadStream(filePath),
    };

    console.log('Fazendo upload...');

    // Faz o upload
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, size, createdTime, webViewLink',
    });

    console.log('Upload concluído com sucesso!');
    console.log(`ID do arquivo: ${response.data.id}`);
    console.log(`Link: ${response.data.webViewLink || 'N/A'}`);

    return;
  } catch (error: any) {
    console.error('Erro ao fazer upload para Google Drive:', error.message);
    throw error;
  }
}

/**
 * Remove backups antigos do Google Drive (mantém apenas os últimos N)
 */
async function cleanOldDriveBackups(keepCount: number = 7): Promise<void> {
  try {
    console.log('\n Limpando backups antigos do Google Drive...');

    const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH;
    if (!credentialsPath || !fs.existsSync(credentialsPath)) {
      console.log('Credenciais não encontradas, pulando limpeza');
      return;
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Query para buscar backups SQL
    let query = "name contains '_backup_' and mimeType='application/sql'";
    if (folderId) {
      query += ` and '${folderId}' in parents`;
    }

    // Lista arquivos de backup
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 100,
    });

    const files = response.data.files || [];
    console.log(`Encontrados ${files.length} backup(s) no Drive`);

    // Remove backups excedentes
    if (files.length > keepCount) {
      const toDelete = files.slice(keepCount);
      console.log(`Removendo ${toDelete.length} backup(s) antigo(s)...`);

      for (const file of toDelete) {
        await drive.files.delete({ fileId: file.id! });
        console.log(`   Removido: ${file.name}`);
      }

      console.log(`Limpeza concluída`);
    } else {
      console.log('Nenhum backup antigo para remover');
    }
  } catch (error: any) {
    console.error('Erro ao limpar backups do Drive:', error.message);
  }
}

// Executa o upload se for chamado diretamente com argumento
if (require.main === module) {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Uso: ts-node upload-to-drive.ts <caminho-do-arquivo>');
    process.exit(1);
  }

  uploadToGoogleDrive(filePath)
    .then(() => cleanOldDriveBackups(7))
    .then(() => {
      console.log('\n Upload concluído com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n Falha no upload:', error.message);
      process.exit(1);
    });
}

export { uploadToGoogleDrive, cleanOldDriveBackups };
