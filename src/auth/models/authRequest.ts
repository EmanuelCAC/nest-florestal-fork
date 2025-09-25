import { User } from "src/user/entities/user.entity";

//para tipar o request do authController
//interface para tipar meu user no controller
export interface AuthRequest extends Request { 
    user: User; 
}