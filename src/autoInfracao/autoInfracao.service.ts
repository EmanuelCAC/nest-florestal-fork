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

  private splitDateAndTime(dateTimeString: string): { date: string; time: string } {
    // Formato esperado: "31/10/2025 20:51" ou "31/10/2025, 20:51"
    if (!dateTimeString || typeof dateTimeString !== 'string') {
      throw new Error('Invalid date string');
    }
    
    // Remove vírgula e espaços extras
    dateTimeString = dateTimeString.replace(',', '').trim();
    
    const parts = dateTimeString.split(' ');
    if (parts.length !== 2) {
      throw new Error('Date must be in format DD/MM/YYYY HH:MM');
    }
    
    const [datePart, timePart] = parts;
    
    // Valida formato da data
    const dateParts = datePart.split('/');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format');
    }
    
    // Valida formato da hora
    const timeParts = timePart.split(':');
    if (timeParts.length !== 2) {
      throw new Error('Invalid time format');
    }
    
    return {
      date: datePart, // formato: "DD/MM/YYYY"
      time: timePart  // formato: "HH:MM"
    };
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
    
    // Separar data e hora para início e término
    const inicioSplit = this.splitDateAndTime(data_hora_inicio_acao);
    const terminoSplit = this.splitDateAndTime(data_hora_termino_acao);

    // criar relatorio
    const relatorio = await this.prisma.relatoriodiario.create({
      data: {
        ...rest,
        data_inicio_acao: inicioSplit.date,
        hora_inicio_acao: inicioSplit.time,
        data_termino_acao: terminoSplit.date,
        hora_termino_acao: terminoSplit.time,
        fiscalId: fiscal.id,
      },
    });

    if (autoinfracao) {
      await this.prisma.autoinfracao.createMany({
        data: autoinfracao.map((auto) => {
          const autoSplit = this.splitDateAndTime(auto.data);
          return {
            id_exemplocaso: auto.id_exemplocaso,
            descricao: auto.descricao,
            data_emissao: autoSplit.date,
            hora_emissao: autoSplit.time,
            latitude: auto.latitude,
            longitude: auto.longitude,
            id_fiscal: fiscal.id,
            relatoriodiarioId: relatorio.id,
          };
        }),
      });
    }

    return { status: 'success', message: 'Relatório criado com sucesso' };
  }
}

