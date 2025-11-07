// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding...');

  // --- 1. Limpar dados antigos (opcional, mas recomendado para consistência) ---
  // A ordem é importante para evitar erros de chave estrangeira
  await prisma.autoinfracao.deleteMany({});
  await prisma.relatoriodiario.deleteMany({});
  await prisma.fiscal.deleteMany({});
  await prisma.exemplocaso.deleteMany({});
  console.log('Banco de dados limpo.');

  // --- 2. Criar Fiscais ---
  const admin = await prisma.fiscal.create({
    data: {
      id: 1, // ID fixo para facilitar
      cpf: '111.111.111-11',
      nome: 'Admin Chefe',
      senha: 'admin', // Lembre-se que em um projeto real, a senha deve ser criptografada!
      tipo: 'administrador',
    },
  });

  const fiscalComum = await prisma.fiscal.create({
    data: {
      id: 2,
      cpf: '222.222.222-22',
      nome: 'Fiscal de Campo',
      senha: 'fiscal',
      tipo: 'fiscal',
    },
  });
  console.log('Fiscais criados:', { admin, fiscalComum });

  // --- 3. Criar um Exemplo de Caso (necessário para o Auto de Infração) ---
  const exemplo = await prisma.exemplocaso.create({
    data: {
      nome_completo: 'Construção Irregular em Área de Preservação',
      categoria: 'Construção Civil',
      proc_op: 'Procedimento Padrão',
      proc_adm: 'Processo Administrativo 123',
      enq_pen: 'Inquérito Penal 456',
      enq_adm: 'Inquérito Administrativo 789',
      modelo: 'Modelo de auto de infração padrão...',
    },
  });
  console.log('Exemplo de caso criado:', exemplo);

  // --- 4. Criar Relatórios ---
  // Relatório que JÁ FOI processado (deve ser ignorado pela nossa rota)
  const relatorioProcessado = await prisma.relatoriodiario.create({
    data: {
      equipe: 'delta_sede_diurno',
      equipe_em_atuacao: 'Fiscal A, Fiscal B',
      orgaos_e_instituicoes_envolvadas: 'Polícia Ambiental',
      responsavel: fiscalComum.nome,
      data_hora_inicio_acao: new Date('2025-09-25T08:00:00Z'),
      data_hora_termino_acao: new Date('2025-09-25T17:00:00Z'),
      origem: 'denuncia',
      registro_ocorrencia: true,
      area_fiscalizada: true,
      municipios: 'caraguatatuba',
      setores: 'caraguatatuba_norte',
      especificacao_local: 'Próximo à foz do Rio Juqueriquerê',
      relatorio: 'Fiscalização realizada conforme denúncia. Nenhuma irregularidade encontrada.',
      outras_atividades: 'N/A',
      cordenadas: '[-23.633, -45.411]',
      km_percorrido: 120,
      horas: 8,
      tipo_acao: 'fiscalizacao_embarcada',
      processado: true, // ESTE ESTÁ PROCESSADO
      fiscalId: fiscalComum.id,
    },
  });

  // Relatório que NÃO FOI processado (o alvo do nosso teste)
  const relatorioNaoProcessado = await prisma.relatoriodiario.create({
    data: {
      equipe: 'charlie_rp_diurno',
      equipe_em_atuacao: 'Fiscal C, Fiscal D',
      orgaos_e_instituicoes_envolvadas: 'N/A',
      responsavel: fiscalComum.nome,
      data_hora_inicio_acao: new Date(), // Data e hora atuais
      data_hora_termino_acao: new Date(),
      origem: 'rotina',
      registro_ocorrencia: true,
      area_fiscalizada: true,
      municipios: 'paraibuna',
      setores: 'alto_da_serra_sul',
      especificacao_local: 'Parque Estadual da Serra do Mar',
      relatorio: 'Iniciada ronda de rotina, duas autuações realizadas por desmatamento.',
      outras_atividades: 'Apoio a equipe de pesquisa.',
      cordenadas: '[-23.383, -45.671]',
      km_percorrido: 85,
      horas: 9,
      processado: false, // <-- ESTE É O QUE QUEREMOS ENCONTRAR
      fiscalId: fiscalComum.id,
      tipo_acao: 'fiscalizacao_embarcada', // Adicionando o campo obrigatório
    },
  });
  console.log('Relatórios criados:', {
    relatorioProcessado,
    relatorioNaoProcessado,
  });

  // --- 5. Criar Autos de Infração e vincular ao relatório NÃO PROCESSADO ---
  const auto1 = await prisma.autoinfracao.create({
    data: {
      data_emissao: new Date(),
      lat: -23.385,
      lon: -45.673,
      descricao: 'Desmatamento de 0.5 hectare de vegetação nativa.',
      // Vínculos
      fiscal: { connect: { cpf: fiscalComum.cpf } },
      exemplocaso: { connect: { id: exemplo.id } },
      relatoriodiario: { connect: { id: relatorioNaoProcessado.id } }, // <-- Conexão importante
    },
  });

  const auto2 = await prisma.autoinfracao.create({
    data: {
      data_emissao: new Date(),
      lat: -23.387,
      lon: -45.675,
      descricao: 'Construção de barraco em área de proteção permanente.',
      // Vínculos
      fiscal: { connect: { cpf: fiscalComum.cpf } },
      exemplocaso: { connect: { id: exemplo.id } },
      relatoriodiario: { connect: { id: relatorioNaoProcessado.id } }, // <-- Conexão importante
    },
  });
  console.log('Autos de Infração criados e vinculados:', { auto1, auto2 });

  console.log('Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });