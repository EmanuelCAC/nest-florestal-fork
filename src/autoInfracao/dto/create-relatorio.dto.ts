import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateAutoInfracaoDto } from "./create-autoinfracao.dto";


export class CreateRelatorioDto {
    
    @IsString()
    equipe: string;

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

    @IsString()
    origem: string;

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

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

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
