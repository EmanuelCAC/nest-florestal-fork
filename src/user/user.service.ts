import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { cpfToHmac } from 'src/util/crypto.util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // entrar no sistema
  findByCpf(cpf: string) {
    // 1. Converte o CPF de plaintext para HMAC
    const hmacCpf = cpfToHmac(cpf);

    // 2. Busca pelo HMAC e usa o nome de campo 'cpf' (minúsculo)
    return this.prisma.fiscal.findUnique({
      where: { cpf: hmacCpf }, // Corrigido de 'CPF' para 'cpf'
      select: {
        cpf: true, // Corrigido de 'CPF' para 'cpf'
        nome: true, // Corrigido de 'Nome' para 'nome'
        senha: true, // Corrigido de 'Senha' para 'senha'
        tipo: true, // Corrigido de 'Tipo' para 'tipo'
      },
    });
  }
}