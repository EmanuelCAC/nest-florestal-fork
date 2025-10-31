import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AutoInfracaoService } from './autoInfracao.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';


@Controller('autoinfracao')
export class AutoInfracaoController {
  constructor(private autoInfracaoService: AutoInfracaoService) {}

  @Get('exemploCaso')
  getExemploCaso() {
    return this.autoInfracaoService.getExemplosDeCasos();
  }


  @Post('relatorio')
  @UseGuards(JwtAuthGuard)
  createRelatorio(@Body() body: CreateRelatorioDto, @Request() req: any) {
    return this.autoInfracaoService.createRelatorio(body, req.user);
  }
}
