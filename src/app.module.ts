import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AutoInfracaoModule } from './autoInfracao/autoInfracao.module';
import { RelatoriodiarioModule } from './relatoriodiario/relatoriodiario.module';
@Module({
  imports: [PrismaModule, AuthModule, AutoInfracaoModule, RelatoriodiarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
