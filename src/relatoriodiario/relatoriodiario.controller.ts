// src/relatoriodiario/relatoriodiario.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { RelatoriodiarioService } from './relatoriodiario.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { IsAdmin } from '../auth/decorators/is-admin.decorator';

@Controller('relatorios-diarios')
export class RelatoriodiarioController {
  constructor(
    private readonly relatoriodiarioService: RelatoriodiarioService,
  ) {}

  @Get('nao-processados')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @IsAdmin()
  findUnprocessed() {
    return this.relatoriodiarioService.findUnprocessedWithRelations();
  }
}