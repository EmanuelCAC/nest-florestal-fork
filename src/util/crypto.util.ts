import * as crypto from 'crypto';

// Pega a chave do .env ou usa uma chave padrão (NÃO SEGURO para produção)
const HMAC_KEY = process.env.CPF_HMAC_KEY;


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