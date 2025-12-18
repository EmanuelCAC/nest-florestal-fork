import { PrismaService } from '../prisma/prisma.service';
export declare class RelatoriodiarioService {
    private prisma;
    constructor(prisma: PrismaService);
    findUnprocessedWithRelations(): Promise<({
        autoinfracao: {
            id: number;
            id_exemplocaso: number;
            descricao: string;
            data_emissao: Date;
            id_fiscal: number;
            relatoriodiarioId: number | null;
        }[];
    } & {
        id: number;
        equipe: import(".prisma/client").$Enums.Equipe;
        equipe_em_atuacao: string;
        orgaos_e_instituicoes_envolvadas: string;
        responsavel: string;
        data_hora_inicio_acao: Date;
        data_hora_termino_acao: Date;
        origem: import(".prisma/client").$Enums.Origem;
        registro_ocorrencia: boolean;
        area_fiscalizada: boolean;
        municipios: import(".prisma/client").$Enums.Municipios;
        setores: import(".prisma/client").$Enums.Setores;
        especificacao_local: string;
        relatorio: string;
        outras_atividades: string;
        coordenadas: string;
        placa_vtr: string | null;
        km_inicio: string | null;
        km_final: string | null;
        condicoes_vtr: string | null;
        tipo_acao: import(".prisma/client").$Enums.TipoAcao;
        veiculos_abordados: string | null;
        tipo_veiculo_abordado: import(".prisma/client").$Enums.TipoVeiculoAbordado | null;
        descricao_veiculos: string | null;
        km_percorrido: string;
        horas_percorridas: string;
        createdAt: Date;
        processado: boolean;
        fiscalId: number;
    })[]>;
    markAsProcessed(id: number): Promise<{
        autoinfracao: {
            id: number;
            id_exemplocaso: number;
            descricao: string;
            data_emissao: Date;
            id_fiscal: number;
            relatoriodiarioId: number | null;
        }[];
    } & {
        id: number;
        equipe: import(".prisma/client").$Enums.Equipe;
        equipe_em_atuacao: string;
        orgaos_e_instituicoes_envolvadas: string;
        responsavel: string;
        data_hora_inicio_acao: Date;
        data_hora_termino_acao: Date;
        origem: import(".prisma/client").$Enums.Origem;
        registro_ocorrencia: boolean;
        area_fiscalizada: boolean;
        municipios: import(".prisma/client").$Enums.Municipios;
        setores: import(".prisma/client").$Enums.Setores;
        especificacao_local: string;
        relatorio: string;
        outras_atividades: string;
        coordenadas: string;
        placa_vtr: string | null;
        km_inicio: string | null;
        km_final: string | null;
        condicoes_vtr: string | null;
        tipo_acao: import(".prisma/client").$Enums.TipoAcao;
        veiculos_abordados: string | null;
        tipo_veiculo_abordado: import(".prisma/client").$Enums.TipoVeiculoAbordado | null;
        descricao_veiculos: string | null;
        km_percorrido: string;
        horas_percorridas: string;
        createdAt: Date;
        processado: boolean;
        fiscalId: number;
    }>;
}
