import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByCpf(cpf: string): import(".prisma/client").Prisma.Prisma__fiscalClient<{
        id: number;
        cpf: string;
        nome: string;
        senha: string;
        tipo: import(".prisma/client").$Enums.tipo_usuario;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__fiscalClient<{
        id: number;
        cpf: string;
        nome: string;
        senha: string;
        tipo: import(".prisma/client").$Enums.tipo_usuario;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
