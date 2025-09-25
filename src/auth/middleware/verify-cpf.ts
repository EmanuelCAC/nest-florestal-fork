//para usar em rotas em que precisamos verificar o cpf sem solicitar a informação como entrada:

import * as jwt from 'jsonwebtoken';

export function extractCpfFromToken(authorization: string): string {
  const token = authorization?.split(' ')[1];
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('Secret key is not defined');
  }

  const decodedToken = jwt.verify(token, secretKey);
  const cpf = (decodedToken as any)['cpf'];

  return cpf;
}
