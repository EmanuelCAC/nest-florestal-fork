import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AutoInfracaoService } from './autoInfracao.service';
import { AutoInfracaoDto } from './dto/autoinfracao.dto';
import { relatorioDiarioDto } from './dto/relatorioDiario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('autoInfracao')
export class AutoInfracaoController {
  constructor(private autoInfracaoService: AutoInfracaoService) {}

  @Get('exemploCaso')
  getExemploCaso() {
    return this.autoInfracaoService.getInfracoes();
  }

  @IsPublic()
  @Post('infracao')
  postInfracao(@Body() relatorio : relatorioDiarioDto, @Req() req) {
    return this.autoInfracaoService.postInfracao(relatorio, req.user.cpf);
  }
}
