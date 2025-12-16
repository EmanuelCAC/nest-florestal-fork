import { AuthService } from './auth.service';
import { AuthRequest } from './models/authRequest';
import { updatePassword } from './models/updatePassword';
import { DeleteRequest } from './models/deleteRequest';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<{
        status: string;
        message: string;
        token: string;
    }>;
    login(loginDto: LoginUserDto): Promise<{
        status: string;
        user: {
            id: number;
            nome: string;
            tipo: import(".prisma/client").$Enums.tipo_usuario;
        };
        token: string;
    }>;
    profile(req: AuthRequest): import("./models/userFromJwt").UserFromJwt;
    resetPassword(body: updatePassword, req: AuthRequest): Promise<{
        status: string;
        message: string;
    }>;
    updatePassword(body: updatePassword): Promise<{
        status: string;
        message: string;
    }>;
    updateAnyPassword(body: updatePassword): Promise<{
        status: string;
        message: string;
    }>;
    deleteUser(req: DeleteRequest): Promise<{
        message: string;
        status?: undefined;
    } | {
        status: string;
        message: string;
    }>;
}
