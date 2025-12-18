import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
export declare class AutoInfracaoService {
    private prisma;
    constructor(prisma: PrismaService);
    getExemplosDeCasos(): Promise<{
        id: number;
        nome_resumo: string | null;
        nome_completo: string;
        palavra_chave: string | null;
        categoria: string;
        tipo_ocorrencia: string | null;
        tags: string | null;
        proc_op: string;
        proc_adm: string;
        enq_pen: string;
        enq_adm: string;
        modelo: string;
        campos: string | null;
    }[]>;
    private convertToISO8601;
    createRelatorio(body: CreateRelatorioDto, requisicao: any): Promise<{
        status: string;
        message: string;
    }>;
}
