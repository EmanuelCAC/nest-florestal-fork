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
    const { autoinfracao, ...rest } = body; 

    // criar relatorio
    const relatorio = await this.prisma.relatoriodiario.create({
      data: {
        ...rest,
        horas: new Date().getHours(),
        fiscalId: fiscal.id,
      },
    });

   if (autoinfracao) {
    await this.prisma.autoinfracao.createMany({
      data: autoinfracao.map((autoinfracao) => ({
        ...autoinfracao,
        relatoriodiarioId: relatorio.id,
      })),
    });
   }

   return relatorio;
   
  }
}


