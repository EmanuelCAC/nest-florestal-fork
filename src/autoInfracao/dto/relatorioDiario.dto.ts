import { AutoInfracaoDto } from "./autoinfracao.dto";

export class relatorioDiarioDto {
    equipes: string[];
    equipe_em_atuacao: string;
    orgaos_e_instituicoes_envolvadas: string;
    responsavel: string;
    data_hora_inicio_acao: Date;
    data_hora_termino_acao: Date;
    origem: string;
    registro_ocorrencia: boolean;
    area_fiscalizada: boolean;
    municipios: string[];
    setores: string[];
    especificacao_local: string;
    relatorio: string;
    outras_atividades: string;
    cordenadas: string;
    placa_vtr: string;
    km_inicio: number;
    km_final: number;
    condicoes_vtr: string;
    tipo_acao: string;
    veiculos_aborados: string;
    tipo_veiculo_aborado: string;
    descricao_veiculos: string;
    km_percorrido: number;
    horas: number;
    processado: boolean;
    infracoes: AutoInfracaoDto;
    fiscalId: number;
}