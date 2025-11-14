//para usar em rotas em que precisamos verificar o ID do usuário sem solicitar a informação como entrada:

import * as jwt from 'jsonwebtoken';

export function extractIdFromToken(authorization: string): number {
  const token = authorization?.split(' ')[1];
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('Secret key is not defined');
  }

  const decodedToken = jwt.verify(token, secretKey);
  const id = (decodedToken as any)['id'];

  return id;
}
