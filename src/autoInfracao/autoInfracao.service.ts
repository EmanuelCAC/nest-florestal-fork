import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';

@Injectable()
export class AutoInfracaoService {
  constructor(private prisma: PrismaService) {}

  async getExemplosDeCasos() {
    const exemploDeCasos = await this.prisma.exemplocaso.findMany();
    return exemploDeCasos;
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

  async createRelatorio(body: CreateRelatorioDto, requisicao: any) {
    //verificar se fiscal autenticado
    const fiscal = await this.prisma.fiscal.findUnique({
      where: { id: requisicao.id },
    });

    //verificar se fiscal autenticado
    if (!fiscal) {
      throw new Error('Fiscal nao autenticado');
    }

    // remover autoinfracao do body
    const { autoinfracao, data_hora_inicio_acao, data_hora_termino_acao, ...rest } = body;
    const dataHoraInicioISO = this.convertToISO8601(data_hora_inicio_acao);
    const dataHoraTerminoISO = this.convertToISO8601(data_hora_termino_acao);

    // Sanitizar campos opcionais que podem vir como string vazia
    const sanitizedData = {
      ...rest,
      tipo_veiculo_abordado: rest.tipo_veiculo_abordado || null,
      placa_vtr: rest.placa_vtr || null,
      km_inicio: rest.km_inicio || null,
      km_final: rest.km_final || null,
      condicoes_vtr: rest.condicoes_vtr || null,
      veiculos_abordados: rest.veiculos_abordados || null,
      descricao_veiculos: rest.descricao_veiculos || null,
    };

    // criar relatorio
    const relatorio = await this.prisma.relatoriodiario.create({
      data: {
        ...sanitizedData,
        data_hora_inicio_acao: dataHoraInicioISO,
        data_hora_termino_acao: dataHoraTerminoISO,
        fiscalId: fiscal.id,
      },
    });

    if (autoinfracao) {
      await this.prisma.autoinfracao.createMany({
        data: autoinfracao.map((auto) => ({
          id_exemplocaso: auto.id_exemplocaso,
          descricao: auto.descricao,
          data_emissao: this.convertToISO8601(auto.data),
          id_fiscal: fiscal.id,
          relatoriodiarioId: relatorio.id,
        })),
      });
    }

    return { status: 'success', message: 'Relatório criado com sucesso' };
  }
}

