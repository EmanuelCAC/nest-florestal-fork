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
}