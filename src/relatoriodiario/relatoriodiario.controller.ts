// src/relatoriodiario/relatoriodiario.controller.ts

import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { RelatoriodiarioService } from './relatoriodiario.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { IsAdmin } from '../auth/decorators/is-admin.decorator';
import { json2csv } from 'json-2-csv';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('relatorios-diarios')
export class RelatoriodiarioController {
  constructor(
    private readonly relatoriodiarioService: RelatoriodiarioService,
  ) {}

  @Get('nao-processados')
  findUnprocessed() {
    return this.relatoriodiarioService.findUnprocessedWithRelations();
  }

  @Post(':id/processar')
  markAsProcessed(@Param('id') id: string) {
    return this.relatoriodiarioService.markAsProcessed(+id)
  }

  @Get('export/:id')
  async exportCsv(@Param('id') id: string, @Res() res: Response) {
    const data = await this.relatoriodiarioService.getData(+id);

    const csv = json2csv([data]);

    res
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', 'attachment; filename="relatorio.csv"')
      .send(csv);
  }
}