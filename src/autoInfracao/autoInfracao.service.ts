import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
  constructor(private prisma: PrismaService) {}

  async getExemplosDeCasos() {
    const exemploDeCasos = await this.prisma.exemplocaso.findMany();
    return exemploDeCasos;
  }
}
