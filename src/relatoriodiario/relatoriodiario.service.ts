// src/relatoriodiario/relatoriodiario.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelatoriodiarioService {
  constructor(private prisma: PrismaService) {}

  async findUnprocessedWithRelations() {
    return this.prisma.relatoriodiario.findMany({
      where: {
        processado: false,
      },
      include: {
        autoinfracao: {
          include: {
            exemplocaso: true,
          },
        },
        fiscal: true
      },
      orderBy: {
        data_hora_inicio_acao: 'asc',
      },
    });
  }

  async findProcessedWithRelations() {
    return this.prisma.relatoriodiario.findMany({
      where: {
        processado: true,
      },
      include: {
        autoinfracao: {
          include: {
            exemplocaso: true,
          },
        },
        fiscal: true
      },
      orderBy: {
        data_hora_inicio_acao: 'asc',
      },
    });
  }

  async markAsProcessed(id: number) {
    const relatorio = await this.prisma.relatoriodiario.findUnique({
      where: { id },
    })

    if (!relatorio) {
      throw new NotFoundException(`Relatório diário com ID ${id} não encontrado`);
    }

    return this.prisma.relatoriodiario.update({
      where: { id },
      data: {
        processado: true,
      },
      include: {
        autoinfracao: true,
      },
    });
  }

  private convertToISO8601(dateString: string): Date {
    // Formato esperado: "31/10/2025 20:51"
    if (!dateString || typeof dateString !== 'string') {
      throw new Error('Invalid date string');
    }
    dateString = dateString.replace(',', '').trim();
    const parts = dateString.split(' ');
    if (parts.length !== 2) {
      throw new Error('Date must be in format DD/MM/YYYY HH:MM');
    }
    const [datePart, timePart] = parts;
    const dateParts = datePart.split('/');
    const timeParts = timePart.split(':');
    if (dateParts.length !== 3 || timeParts.length !== 2) {
      throw new Error('Invalid date format');
    }
    const [day, month, year] = dateParts.map(p => parseInt(p, 10));
    const [hour, minute] = timeParts.map(p => parseInt(p, 10));
    if ([day, month, year, hour, minute].some(isNaN)) {
      throw new Error('Date contains non-numeric values');
    }
    // Optionally, check for valid ranges (day: 1-31, month: 1-12, hour: 0-23, minute: 0-59)
    if (
      day < 1 || day > 31 ||
      month < 1 || month > 12 ||
      hour < 0 || hour > 23 ||
      minute < 0 || minute > 59
    ) {
      throw new Error('Date contains out-of-range values');
    }
    return new Date(year, month - 1, day, hour, minute);
  }

  async getData(id: number) {
    const data = await this.prisma.relatoriodiario.findUnique({
      where: {id},
    })

    return {
      "EQUIPE": data?.equipe as string,
      "Equipe em Atuação": data?.equipe_em_atuacao as string,
      "Órgãos e Instituições Envolvidas": data?.orgaos_e_instituicoes_envolvadas as string,
      "Responsável": data?.responsavel as string,
      "Data e Hora do Início da Ação": data?.data_hora_inicio_acao.toISOString() as string,
      "Data e Hora do Término da Ação": data?.data_hora_termino_acao.toISOString() as string,
      "Origem da Ação": data?.origem as string,
      "Registro de Ocorrência": data?.registro_ocorrencia  ? 'Sim' : 'Não',
      "Área Fiscalizada Na Área Protegida":  data?.area_fiscalizada  ? 'Sim' : 'Não',
      "Município(s)": data?.municipios as string,
      "Endereço(s)": data?.enderecos as string,
      "Setores Fiscalizados": data?.setores as string,
      "Especificação do Local": data?.especificacao_local as string,
      "Relatório de Fiscalização": data?.relatorio as string,
      "Coordenadas Geográficas e referência da coordenada": data?.coordenadas as string,
      "Tipo de Ação": data?.tipo_acao as string,
      "KM Percorridos (Viatura e a pé)": data?.km_percorrido as string,
      "Horas (Viatura e a pé)": data?.horas_percorridas as string,
    }
  }

  async getMultipleData(ids: number[]) {
    const relatorios = await this.prisma.relatoriodiario.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        autoinfracao: true,
      },
    });

    return relatorios.map((data) => {
      // Remover a relação autoinfracao do objeto e criar objeto base
      const { autoinfracao, ...baseData } = data;

      // Adicionar autos de infração dinamicamente
      const autosData = {};
      autoinfracao.forEach((auto, index) => {
        autosData[`auto_infracao_${index + 1}`] = auto.descricao ?? '';
      });

      return { ...baseData, ...autosData };
    });
  }
}