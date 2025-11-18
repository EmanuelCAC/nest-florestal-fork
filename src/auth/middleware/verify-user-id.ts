//para usar em rotas em que precisamos verificar o ID do usuário sem solicitar a informação como entrada:

import * as jwt from 'jsonwebtoken';

export function extractIdFromToken(authorization: string): number {
  if (!authorization) {
    throw new Error('Authorization header is required');
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    throw new Error('Token not found in authorization header');
  }
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('Secret key is not defined');
  }
  const decodedToken = jwt.verify(token, secretKey) as any;
  const id = decodedToken['id'];
  if (typeof id !== 'number') {
    throw new Error('Invalid token: id not found');
  }
  return id;
}
