// src/relatoriodiario/relatoriodiario.controller.ts

import { Controller, Get, Param, Post, Res, UseGuards, Body } from '@nestjs/common';
import { RelatoriodiarioService } from './relatoriodiario.service';

import { json2csv } from 'json-2-csv';
import { Response } from 'express';

@Controller('relatorios-diarios')
export class RelatoriodiarioController {
  constructor(
    private readonly relatoriodiarioService: RelatoriodiarioService,
  ) {}

  @Get('nao-processados')
  findUnprocessed() {
    return this.relatoriodiarioService.findUnprocessedWithRelations();
  }

  @Get('processados')
  findProcessed() {
    return this.relatoriodiarioService.findProcessedWithRelations();
  }

  @Get(':id/processar')
  markAsProcessed(@Param('id') id: string) {
    return this.relatoriodiarioService.markAsProcessed(+id)
  }

  @Post('export')
  async exportCsv(@Body('ids') ids: number[], @Res() res: Response) {
    const data = await this.relatoriodiarioService.getMultipleData(ids);

    const csv = json2csv(data, {
      delimiter: {
        field: ';'
      }
    });
    
    // Adiciona BOM (Byte Order Mark) para UTF-8
    const csvWithBOM = '\ufeff' + csv;

    res
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', 'attachment; filename="relatorios.csv"')
      .send(csvWithBOM);
  }
}