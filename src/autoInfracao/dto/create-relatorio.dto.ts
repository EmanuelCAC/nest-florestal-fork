import { IsBoolean, IsEnum, isEnum, isIn, IsNumber, IsOptional, IsString, isString } from "class-validator";
import { CreateAutoInfracaoDto } from "./create-autoinfracao.dto";
import e from "express";

export enum tipo_acao {
  incursao_viatura = 'incursao_viatura',
  incrusao_pe = 'incrusao_pe',
  fiscalizacao_embarcada = 'fiscalizacao_embarcada',
  sobrevoo = 'sobrevoo',
  fiscalizacao_drone = 'fiscalizacao_drone',
  bloqueio = 'bloqueio',
}

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

export enum municipios {
  caraguatatuba = 'caraguatatuba',
  paraibuna = 'paraibuna',
  natividade_da_serra = 'natividade_da_serra',
}

export enum setores {
  caraguatatuba_norte = 'caraguatatuba_norte',
  caraguatatuba_sul = 'caraguatatuba_sul',
  alto_da_serra_norte = 'alto_da_serra_norte',
  alto_da_serra_sul = 'alto_da_serra_sul',
}

export enum tipoVeiculoAbordado {
  carro = 'carro',
  moto = 'moto',
  caminhao = 'caminhao',
  onibusVan = 'onibusVan',
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

    @IsEnum(municipios)
    municipios: municipios;

    @IsEnum(setores)
    setores: setores;

    @IsString()
    especificacao_local: string;

    @IsString()
    relatorio: string;

    @IsString()    
    outras_atividades: string;

    @IsString()
    cordenadas: string;

    @IsString()
    placa_vtr?: string;

    @IsNumber()
    km_inicio?: number;

    @IsNumber()
    km_final?: number;

    @IsString()
    condicoes_vtr?: string;

    @IsEnum(tipo_acao)
    tipo_acao:  tipo_acao;
    
    @IsString()
    veiculos_abordados?: string;

    @IsEnum(tipoVeiculoAbordado)
    tipo_veiculo_abordado?: tipoVeiculoAbordado;

    @IsString()
    descricao_veiculos?: string;

    @IsNumber()
    km_percorrido: number;

    @IsOptional()
    autoinfracao?: CreateAutoInfracaoDto[];
}