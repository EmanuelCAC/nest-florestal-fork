import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  //entrar no sistema
  findByCpf(cpf: string) {
    return this.prisma.fiscal.findUnique({
      where: { cpf: cpf },
      select: { cpf: true, nome: true, senha: true, tipo: true },
    });
  }

  findById(id: number) {
    return this.prisma.fiscal.findUnique({
      where: { id: id },
      select: { id: true, nome: true, senha: true, tipo: true },
    });
  }

  findAll() {
    return this.prisma.fiscal.findMany({
      select: { id: true, nome: true, tipo: true },
    });
  }
}
