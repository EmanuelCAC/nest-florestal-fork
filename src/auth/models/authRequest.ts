import { Request } from 'express';
import { UserFromJwt } from './userFromJwt';

//para tipar o request do authController
//interface para tipar meu user no controller
export interface AuthRequest extends Request { 
    user: UserFromJwt; 
}
