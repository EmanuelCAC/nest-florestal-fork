// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import infracoes from './casos.json';
import { json } from 'stream/consumers';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('5enha#', 10);

  // Exemplo de inserção de dados
  await prisma.fiscal.create({
    data: {
      cpf: '12345678901',
      nome: 'teste',
      senha: hashedPassword,
      tipo: 'Admin',
    },
  });

 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
