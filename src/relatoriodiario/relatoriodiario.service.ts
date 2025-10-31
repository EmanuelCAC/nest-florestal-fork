import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho se o seu PrismaService estiver em outro lugar

@Injectable()
export class RelatoriodiarioService {
  // Injeta o PrismaService para que possamos interagir com o banco
  constructor(private prisma: PrismaService) {}

  /**
   * Busca todos os relatórios diários que não foram processados
   * e inclui todos os autos de infração relacionados a cada relatório.
   */
  async findUnprocessedWithRelations() {
    return this.prisma.relatoriodiario.findMany({
      // A cláusula 'where' é usada para filtrar os resultados
      where: {
        processado: false, // Queremos apenas os relatórios onde 'processado' é 'false'
      },
      // A cláusula 'include' é usada para carregar dados de tabelas relacionadas
      include: {
        autoinfracao: true, // Inclui todos os autos de infração associados
      },
      // Opcional: Ordena os relatórios mais antigos primeiro
      orderBy: {
        data_hora_inicio_acao: 'asc',
      },
    });
  }
}