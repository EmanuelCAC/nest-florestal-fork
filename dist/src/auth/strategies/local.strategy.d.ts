import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(cpf: string, password: string): Promise<{
        senha: undefined;
        id: number;
        cpf: string;
        nome: string;
        tipo: import(".prisma/client").$Enums.tipo_usuario;
    }>;
}
export {};
