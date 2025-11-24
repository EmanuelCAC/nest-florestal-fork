import { Module } from '@nestjs/common';
import { RelatoriodiarioService } from './relatoriodiario.service';
import { RelatoriodiarioController } from './relatoriodiario.controller';

@Module({
  controllers: [RelatoriodiarioController],
  providers: [RelatoriodiarioService],
})
export class RelatoriodiarioModule {}
