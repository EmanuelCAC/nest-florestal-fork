import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AutoInfracaoService } from './autoInfracao.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { relatorioDiarioDto } from './dto/relatorioDiario.dto';


@Controller('autoinfracao')
export class AutoInfracaoController {
  constructor(private autoInfracaoService: AutoInfracaoService) {}

  @Get('exemploCaso')
  getExemploCaso() {
    return this.autoInfracaoService.getExemplosDeCasos();
  }


  @Post('relatorio')
  createRelatorio(@Body() body: CreateRelatorioDto, @Request() req: any) {
    return this.autoInfracaoService.createRelatorio(body, req.user);
  }

  @IsPublic()
  @Post('infracao')
  postInfracao(@Body() relatorio : relatorioDiarioDto, @Req() req) {
    return this.autoInfracaoService.postInfracao(relatorio, req.user.cpf);
  }
}
