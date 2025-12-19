import { CreateAutoInfracaoDto } from "./create-autoinfracao.dto";
export declare enum tipo_acao {
    incursao_viatura = "incursao_viatura",
    incrusao_pe = "incrusao_pe",
    fiscalizacao_embarcada = "fiscalizacao_embarcada",
    sobrevoo = "sobrevoo",
    fiscalizacao_drone = "fiscalizacao_drone",
    bloqueio = "bloqueio"
}
export declare enum equipe {
    charlie_sede_diurno = "charlie_sede_diurno",
    charlie_rp_diurno = "charlie_rp_diurno",
    charlie_rp_noturno = "charlie_rp_noturno",
    delta_sede_diurno = "delta_sede_diurno",
    delta_rp_diurno = "delta_rp_diurno",
    delta_rp_noturno = "delta_rp_noturno"
}
export declare enum origem {
    rotina = "rotina",
    planejamento_SIMUC = "planejamento_SIMUC",
    dejem_SIMUC = "dejem_SIMUC",
    denuncia = "denuncia",
    atendimento_orgaos_externos = "atendimento_orgaos_externos",
    demanda_soliitacao_inerna = "demanda_soliitacao_inerna"
}
export declare enum municipios {
    caraguatatuba = "caraguatatuba",
    paraibuna = "paraibuna",
    natividade_da_serra = "natividade_da_serra"
}
export declare enum setores {
    caraguatatuba_norte = "caraguatatuba_norte",
    caraguatatuba_sul = "caraguatatuba_sul",
    alto_da_serra_norte = "alto_da_serra_norte",
    alto_da_serra_sul = "alto_da_serra_sul"
}
export declare enum tipoVeiculoAbordado {
    carro = "carro",
    moto = "moto",
    caminhao = "caminhao",
    onibusVan = "onibusVan"
}
export declare class CreateRelatorioDto {
    equipe: equipe;
    equipe_em_atuacao: string;
    orgaos_e_instituicoes_envolvadas: string;
    responsavel: string;
    data_hora_inicio_acao: string;
    data_hora_termino_acao: string;
    origem: origem;
    registro_ocorrencia: boolean;
    area_fiscalizada: boolean;
    municipios: municipios;
    setores: setores;
    especificacao_local: string;
    relatorio: string;
    outras_atividades: string;
    coordenadas: string;
    placa_vtr?: string;
    km_inicio?: string;
    km_final?: string;
    condicoes_vtr?: string;
    tipo_acao: tipo_acao;
    veiculos_abordados?: string;
    tipo_veiculo_abordado?: tipoVeiculoAbordado;
    descricao_veiculos?: string;
    km_percorrido: string;
    horas_percorridas: string;
    autoinfracao?: CreateAutoInfracaoDto[];
}
