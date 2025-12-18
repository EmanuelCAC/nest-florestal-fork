import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import * as readline from 'readline';

config();

const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');

/**
 * Lê credenciais OAuth do arquivo
 */
function loadOAuthCredentials() {
  const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH;
  if (!credentialsPath || !fs.existsSync(credentialsPath)) {
    throw new Error('Arquivo de credenciais não encontrado');
  }
  return JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
}

/**
 * Cria cliente OAuth2
 */
function createOAuth2Client() {
  const credentials = loadOAuthCredentials();
  
  // Verifica se é Service Account ou OAuth
  if (credentials.type === 'service_account') {
    throw new Error(
      'Você está usando Service Account. Para contas Gmail gratuitas, use OAuth 2.0.\n' +
      'Execute: npm run backup:setup-oauth'
    );
  }
  
  const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

/**
 * Obtém token salvo ou solicita novo
 */
async function getAuthClient() {
  const oauth2Client = createOAuth2Client();
  
  // Tenta carregar token salvo
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oauth2Client.setCredentials(token);
    return oauth2Client;
  }
  
  // Se não tem token, precisa autenticar
  throw new Error(
    'Token não encontrado. Execute primeiro: npm run backup:setup-oauth'
  );
}

/**
 * Processo de autenticação OAuth (primeira vez)
 */
async function authenticateOAuth() {
  const oauth2Client = createOAuth2Client();
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
  });
  
  console.log('Autenticação necessária!\n');
  console.log('1. Abra este link no navegador:\n');
  console.log(authUrl);
  console.log('\n2. Autorize o acesso');
  console.log('3. Copie o código de autorização\n');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise<void>((resolve, reject) => {
    rl.question('Cole o código aqui: ', async (code) => {
      rl.close();
      
      try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // Salva o token
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log('\nToken salvo com sucesso!');
        console.log('Arquivo: google-token.json\n');
        
        resolve();
      } catch (error: any) {
        reject(new Error('Erro ao obter token: ' + error.message));
      }
    });
  });
}

/**
 * Faz upload usando OAuth
 */
async function uploadToGoogleDriveOAuth(filePath: string): Promise<void> {
  try {
    console.log('\nIniciando upload para Google Drive...');
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    
    const auth = await getAuthClient();
    const drive = google.drive({ version: 'v3', auth });
    
    const fileName = path.basename(filePath);
    const fileSize = fs.statSync(filePath).size;
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    
    console.log(`Arquivo: ${fileName}`);
    console.log(`Tamanho: ${fileSizeMB} MB`);
    
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    const fileMetadata: any = {
      name: fileName,
      mimeType: 'application/sql',
    };
    
    if (folderId) {
      fileMetadata.parents = [folderId];
      console.log(`Pasta: ${folderId}`);
    }
    
    const media = {
      mimeType: 'application/sql',
      body: fs.createReadStream(filePath),
    };
    
    console.log('Fazendo upload...');
    
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
    });
    
    console.log('Upload concluído!');
    console.log(`Link: ${response.data.webViewLink || 'N/A'}\n`);
  } catch (error: any) {
    if (error.message.includes('Token não encontrado')) {
      console.error('\n' + error.message + '\n');
    } else {
      console.error('Erro no upload:', error.message);
    }
    throw error;
  }
}

// Se chamado diretamente
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'setup') {
    authenticateOAuth()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error.message);
        process.exit(1);
      });
  } else if (command) {
    uploadToGoogleDriveOAuth(command)
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  } else {
    console.log('Uso:');
    console.log('  npm run backup:setup-oauth   - Configurar autenticação');
    console.log('  npm run backup:upload <file> - Fazer upload');
    process.exit(1);
  }
}

export { uploadToGoogleDriveOAuth, authenticateOAuth };
