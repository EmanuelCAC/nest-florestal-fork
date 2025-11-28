import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { CreateAutoInfracaoDto } from "./create-autoinfracao.dto";

export enum equipe {
  charlie_sede_diurno = 'charlie_sede_diurno',
  charlie_rp_diurno = 'charlie_rp_diurno',
  charlie_rp_noturno = 'charlie_rp_noturno',
  delta_sede_diurno = 'delta_sede_diurno',
  delta_rp_diurno = 'delta_rp_diurno',
  delta_rp_noturno = 'delta_rp_noturno',
}

export enum origem {
  rotina = 'rotina',
  planejamento_SIMUC = 'planejamento_SIMUC',
  dejem_SIMUC = 'dejem_SIMUC',
  denuncia = 'denuncia',
  atendimento_orgaos_externos = 'atendimento_orgaos_externos',
  demanda_soliitacao_inerna = 'demanda_soliitacao_inerna',
}


export class CreateRelatorioDto {
    
    @IsEnum(equipe)
    equipe: equipe;

    @IsString()
    equipe_em_atuacao: string;

    @IsString()
    orgaos_e_instituicoes_envolvadas: string;

    @IsString()
    responsavel: string;

    @IsString()
    data_hora_inicio_acao: string;
    
    @IsString()
    data_hora_termino_acao: string;

    @IsEnum(origem)
    origem: origem;

    @IsBoolean()
    registro_ocorrencia: boolean;

    @IsBoolean()
    area_fiscalizada: boolean;

    @IsString()
    municipios: string;

    @IsString()
    enderecos: string

    @IsString()
    setores: string;

    @IsString()
    especificacao_local: string;

    @IsString()
    relatorio: string;

    @IsString()    
    outras_atividades: string;

    @IsString()
    coordenadas: string;

    @IsString()
    placa_vtr?: string;

    @IsString()
    km_inicio?: string;

    @IsString()
    km_final?: string;

    @IsString()
    condicoes_vtr?: string;

    @IsString()
    tipo_acao:  string;
    
    @IsString()
    veiculos_abordados?: string;

    @IsString()
    tipo_veiculo_abordado?: string;

    @IsString()
    descricao_veiculos?: string;

    @IsString()
    km_percorrido: string;

    @IsString()
    horas_percorridas: string;

    @IsOptional()
    autoinfracao?: CreateAutoInfracaoDto[];
}
