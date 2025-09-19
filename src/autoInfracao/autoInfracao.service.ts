import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
    constructor(private prisma: PrismaService) {}
    
    async getInfracoes() {
        const autosNaoDespachados = await this.prisma.infracao.findMany();
        return autosNaoDespachados;
    }

    async postInfracao(relatorio, cpf) 
    {
        try{


            const fiscal = await this.prisma.fiscal.findUnique({where: {CPF: cpf}});
    
            if (!fiscal) {
                throw new Error('Fiscal nao encontrado');
            }
    
            await this.prisma.relatorioDiario.create({data: 
                {
                    equipes: relatorio.equipes,
                    equipe_em_atuacao: relatorio.equipe_em_atuacao,
                    orgaos_e_instituicoes_envolvadas: relatorio.orgaos_e_instituicoes_envolvadas,
                    responsavel: relatorio.responsavel,
                    data_hora_inicio_acao: relatorio.data_hora_inicio_acao,
                    data_hora_termino_acao: relatorio.data_hora_termino_acao,
                    origem: relatorio.origem,
                    registro_ocorrencia: relatorio.registro_ocorrencia,
                    area_fiscalizada: relatorio.area_fiscalizada,
                    municipios: relatorio.municipios,
                    setores: relatorio.setores,
                    especificacao_local: relatorio.especificacao_local,
                    relatorio: relatorio.relatorio,
                    outras_atividades: relatorio.outras_atividades,
                    cordenadas: relatorio.cordenadas,
                    placa_vtr: relatorio.placa_vtr,
                    km_inicio: relatorio.km_inicio,
                    km_final: relatorio.km_final,
                    condicoes_vtr: relatorio.condicoes_vtr,
                    tipo_acao: relatorio.tipo_acao,
                    veiculos_aborados: relatorio.veiculos_aborados,
                    tipo_veiculo_aborado: relatorio.tipo_veiculo_aborado,
                    descricao_veiculos: relatorio.descricao_veiculos,
                    km_percorrido: relatorio.km_percorrido,
                    horas: relatorio.horas, 
                    autoinfracao: relatorio.infracoes.autoinfracao.id,
                    fiscal: fiscal.id
                }
            })
    
            await this.prisma.autoInfracao.create({data: 
                {
                    data_emissao: relatorio.infracoes.autoinfracao.data_emissao,
                    cpf: relatorio.infracoes.autoinfracao.cpf,
                    lat: relatorio.infracoes.autoinfracao.lat,
                    lon: relatorio.infracoes.autoinfracao.lon,
                    id_exemplocaso: relatorio.infracoes.autoinfracao.id_exemplocaso,
                    descricao: relatorio.infracoes.autoinfracao.descricao,
                    relatoriodiarioId: relatorio.infracoes.autoinfracao.relatoriodiarioId
                }
            })
    
            return "AutoInfracao criada com sucesso";
    
    
        }
        catch (error) {
            console.log(error);
        }
        }





}


