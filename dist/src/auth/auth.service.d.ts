import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    protected prisma: PrismaService;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    signup(user: User): Promise<{
        status: string;
        message: string;
        token: string;
    }>;
    login(user: LoginUserDto): Promise<{
        status: string;
        user: {
            id: number;
            nome: string;
            tipo: import(".prisma/client").$Enums.tipo_usuario;
        };
        token: string;
    }>;
    updatePassword(id: number, currentPassword: string, newPassword: string, newPasswordConfirm: string): Promise<{
        status: string;
        message: string;
    }>;
    updateOwnPassword(password: string, passwordConfirm: string, cpf: string): Promise<{
        status: string;
        message: string;
    }>;
    updateAnyPassword(adminPassword: string, targetcpf: string, newPassword: string): Promise<{
        status: string;
        message: string;
    }>;
    deleteUserByCpf(cpf: string): Promise<{
        message: string;
        status?: undefined;
    } | {
        status: string;
        message: string;
    }>;
    validateUser(cpf: string, senha: string): Promise<{
        senha: undefined;
        id: number;
        cpf: string;
        nome: string;
        tipo: import(".prisma/client").$Enums.tipo_usuario;
    }>;
}
