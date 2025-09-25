import { Controller, Get, UseGuards } from '@nestjs/common';
import { AutoInfracaoService } from './autoInfracao.service';

@Controller('autoInfracao')
export class AutoInfracaoController {
  constructor(private autoInfracaoService: AutoInfracaoService) {}

  @Get('exemploCaso')
  getExemploCaso() {
    return this.autoInfracaoService.getExemplosDeCasos();
  }
}
