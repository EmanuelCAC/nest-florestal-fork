import { AutoInfracaoService } from './autoInfracao.service';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
export declare class AutoInfracaoController {
    private autoInfracaoService;
    constructor(autoInfracaoService: AutoInfracaoService);
    getExemploCaso(): Promise<{
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
    createRelatorio(body: CreateRelatorioDto, req: any): Promise<{
        status: string;
        message: string;
    }>;
}
