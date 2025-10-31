import { Controller, Get, UseGuards } from '@nestjs/common';
import { RelatoriodiarioService } from './relatoriodiario.service';
import { AdminGuard } from '../auth/guards/admin.guard'; // Ajuste o caminho se necessário
import { IsAdmin } from '../auth/decorators/is-admin.decorator'; // Ajuste o caminho se necessário
import { AuthGuard } from '@nestjs/passport'; // Importe o AuthGuard padrão do JWT

@Controller('relatorios-diarios') // Define o prefixo da rota para /relatorios-diarios
export class RelatoriodiarioController {
  constructor(private readonly relatoriodiarioService: RelatoriodiarioService) {}

  @Get('nao-processados') // A rota completa será: GET /relatorios-diarios/nao-processados
  @UseGuards(AuthGuard('jwt'), AdminGuard) // 1º: Verifica se o usuário está logado (JWT). 2º: Verifica se é admin.
  @IsAdmin() // Decorator para o AdminGuard saber que esta rota exige admin
  findUnprocessed() {
    return this.relatoriodiarioService.findUnprocessedWithRelations();
  }
}