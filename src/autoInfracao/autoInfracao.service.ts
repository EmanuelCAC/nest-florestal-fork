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
    console.log(dateString)
    dateString = dateString.replace(',', '');
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    
    return new Date(
      parseInt(year),
      parseInt(month) - 1, // mês é zero-indexado
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );
  }

  async createRelatorio(body: CreateRelatorioDto, requisicao: any) {
    console.log('requisicao:', requisicao);

    //verificar se fiscal autenticado
    const fiscal = await this.prisma.fiscal.findUnique({
      where: { cpf: requisicao.cpf },
    });

    //verificar se fiscal autenticado
    if (!fiscal) {
      throw new Error('Fiscal nao autenticado');
    }

    // remover autoinfracao do body
    const { autoinfracao, data_hora_inicio_acao, data_hora_termino_acao, ...rest } = body;
    console.log(data_hora_inicio_acao, data_hora_termino_acao)
    const dataHoraInicioISO = this.convertToISO8601(data_hora_inicio_acao);
    const dataHoraTerminoISO = this.convertToISO8601(data_hora_termino_acao);

    // criar relatorio
    const relatorio = await this.prisma.relatoriodiario.create({
      data: {
        ...rest,
        data_hora_inicio_acao: dataHoraInicioISO,
        data_hora_termino_acao: dataHoraTerminoISO,
        fiscalId: fiscal.id,
      },
    });

   if (autoinfracao) {
    await this.prisma.autoinfracao.createMany({
      data: autoinfracao.map((auto) => ({
        ...auto,
        data_emissao: this.convertToISO8601(auto.data_emissao),
        cpf: fiscal.cpf,
        relatoriodiarioId: relatorio.id,
      })),
    });
   }

   return relatorio;
   
  }
}


