// src/relatoriodiario/relatoriodiario.service.ts

import { Injectable } from '@nestjs/common';
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
        autoinfracao: true,
      },
      orderBy: {
        data_hora_inicio_acao: 'asc',
      },
    });
  }
}