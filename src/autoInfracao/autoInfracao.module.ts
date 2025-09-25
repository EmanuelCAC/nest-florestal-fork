import { Module } from '@nestjs/common';
import { AutoInfracaoController } from './autoInfracao.controller';
import { AutoInfracaoService } from './autoInfracao.service';


@Module({
  controllers: [AutoInfracaoController],
  providers: [AutoInfracaoService],
})
export class AutoInfracaoModule {}