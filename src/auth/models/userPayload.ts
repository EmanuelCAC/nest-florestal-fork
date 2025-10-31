export interface UserPayload {
  cpf: string;
  nome: string;
  tipo: string;
  iat?: number; // issued at: data de emissão
  exp?: number; // expiration: data de expiração
}
