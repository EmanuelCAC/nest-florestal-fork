import { Request } from 'express';
import { UserFromJwt } from './userFromJwt';
export interface AuthRequest extends Request {
    user: UserFromJwt;
}
