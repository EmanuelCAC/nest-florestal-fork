import * as crypto from 'crypto';
import * as fs from 'fs';

// Pega a chave do .env ou usa uma chave padrão (NÃO SEGURO para produção)
const HMAC_KEY = process.env.CPF_HMAC_KEY;
const BACKUP_ENCRYPTION_KEY = process.env.BACKUP_ENCRYPTION_KEY;

export function cpfToHmac(cpf: string): string {
  if (!HMAC_KEY) {
    throw new Error('CPF_HMAC_KEY não está definida no arquivo .env');
  }

  // 1. Normaliza (remove todos os caracteres não numéricos)
  const normalized = cpf.replace(/\D/g, '');

  // 2. Cria e retorna o HMAC
  return crypto
    .createHmac('sha256', HMAC_KEY)
    .update(normalized)
    .digest('hex');
}

/**
 * Criptografa um arquivo usando AES-256-GCM
 * @param inputPath Caminho do arquivo a ser criptografado
 * @param outputPath Caminho do arquivo criptografado (opcional)
 * @returns Caminho do arquivo criptografado
 */
export function encryptFile(inputPath: string, outputPath?: string): string {
  if (!BACKUP_ENCRYPTION_KEY) {
    throw new Error('BACKUP_ENCRYPTION_KEY não está definida no arquivo .env');
  }

  // Deriva uma chave de 32 bytes da chave fornecida
  const key = crypto.scryptSync(BACKUP_ENCRYPTION_KEY, 'salt', 32);
  
  // Gera um IV aleatório de 16 bytes
  const iv = crypto.randomBytes(16);
  
  // Cria o cipher
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  // Define o caminho de saída
  const output = outputPath || `${inputPath}.encrypted`;
  
  // Lê o arquivo de entrada
  const input = fs.readFileSync(inputPath);
  
  // Criptografa
  const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);
  
  // Obtém o authentication tag
  const authTag = cipher.getAuthTag();
  
  // Salva: IV (16 bytes) + Auth Tag (16 bytes) + Dados criptografados
  const finalBuffer = Buffer.concat([iv, authTag, encrypted]);
  fs.writeFileSync(output, finalBuffer);
  
  return output;
}

/**
 * Descriptografa um arquivo usando AES-256-GCM
 * @param inputPath Caminho do arquivo criptografado
 * @param outputPath Caminho do arquivo descriptografado (opcional)
 * @returns Caminho do arquivo descriptografado
 */
export function decryptFile(inputPath: string, outputPath?: string): string {
  if (!BACKUP_ENCRYPTION_KEY) {
    throw new Error('BACKUP_ENCRYPTION_KEY não está definida no arquivo .env');
  }

  // Deriva a mesma chave de 32 bytes
  const key = crypto.scryptSync(BACKUP_ENCRYPTION_KEY, 'salt', 32);
  
  // Lê o arquivo criptografado
  const encryptedBuffer = fs.readFileSync(inputPath);
  
  // Extrai IV (16 bytes), Auth Tag (16 bytes) e dados criptografados
  const iv = encryptedBuffer.subarray(0, 16);
  const authTag = encryptedBuffer.subarray(16, 32);
  const encrypted = encryptedBuffer.subarray(32);
  
  // Cria o decipher
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  
  // Descriptografa
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  
  // Define o caminho de saída
  const output = outputPath || inputPath.replace('.encrypted', '');
  
  // Salva o arquivo descriptografado
  fs.writeFileSync(output, decrypted);
  
  return output;
}