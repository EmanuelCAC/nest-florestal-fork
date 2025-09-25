import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import infracoes from './casos.json';
import { json } from 'stream/consumers';

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

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Reformas Sem Autorização',
  //     nome_completo:
  //       'Reformas: os serviços ou obras que impliquem em modificações na construção anterior existente, sem ampliar o perímetro da área construída. ',
  //     palavra_chave: 'Reforma sem autorização',
  //     categoria: 'Reformas',
  //     tags: 'Reforma, Reformas sem autorização, Ampliação, Ampliações, Ampliações sem autorização',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no art. 67 da Resolução SIMA N° 05/2021, por realizar quaisquer atividades ou adotar conduta em desacordo com os objetivos da unidade de conservação, o seu plano de manejo e regulamentos, tendo sido qualificado (s) o(s) infrator(es) _____(Nome completo), flagrados executando reforma das seguintes estruturas: 1-________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , 2- _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (descrever as intervenções detalhadamente, com materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). \n OBS: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres: \n 'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.'",
  //     tipo_ocorrencia:
  //       'REALIZAR QUAISQUER ATIVIDADES OU ADOTAR CONDUTA EM DESACORDO COM OS OBJETIVOS DA UNIDADE DE CONSERVAÇÃO, O SEU PLANO DE MANEJO E REGULAMENTOS',
  //     campos: JSON.stringify(infracoes.Reformas1),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Reformas sem autorização',
  //     nome_completo:
  //       'Reformas: os serviços ou obras que impliquem em modificações na construção anterior existente, sem ampliar o perímetro da área construída. ',
  //     palavra_chave: 'Reformas sem autorização',
  //     categoria: 'Reformas',
  //     tags: 'Reforma, Reformas sem autorização, Ampliação, Ampliações, Ampliações sem autorização',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO) na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no art. 67 da Resolução SIMA N° 05/2021, por realizar quaisquer atividades ou adotar conduta em desacordo com os objetivos da unidade de conservação, o seu plano de manejo e regulamentos, mediante reforma das seguintes estruturas: 1-________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , 2- _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (descrever as intervenções detalhadamente, com materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. Obs: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc....',
  //     tipo_ocorrencia:
  //       'REALIZAR QUAISQUER ATIVIDADES OU ADOTAR CONDUTA EM DESACORDO COM OS OBJETIVOS DA UNIDADE DE CONSERVAÇÃO, O SEU PLANO DE MANEJO E REGULAMENTOS',
  //     campos: JSON.stringify(infracoes.Reformas2),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Matar animal',
  //     nome_completo: 'Flagrar o individuo matando/abatendo o animal',
  //     palavra_chave: 'Matar Animal',
  //     categoria: 'Fauna',
  //     tags: 'Matar animal',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 25 da Resolução SIMA N° 05/2021, por matar animal (is) silvestre (s) da(s) espécie (s)_______________, mediante atividade de caça. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Com o infrator foi localizado (tipo da arma de fogo, instrumento ou armadilha)_____________. Tal crime foi constatado no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). O infrator, o instrumento de caça e o animal abatido foram encaminhados ao (informar o distrito policial)_______________ para lavratura do boletim de ocorrência e registro da apreensão.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.MatarAnimal),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Perseguir animal',
  //     nome_completo:
  //       'Flagrar o individuo seguindo/perseguindo de perto, indo ao encalço do animal silvestre;',
  //     palavra_chave: 'Perseguir Animal',
  //     categoria: 'Fauna',
  //     tags: 'Perseguir animal',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 25 da Resolução SIMA N° 05/2021, por perseguir animal (is) silvestre (s) da(s) espécie (s)_______________, mediante atividade de caça. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Com o infrator foi localizado (tipo da arma de fogo, instrumento ou armadilha)_____________. Tal crime foi constatado no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). O infrator e o instrumento de caça foram encaminhados ao (informar o distrito policial)_______________ para lavratura do boletim de ocorrência e registro da apreensão.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.PerseguirAnimal),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Capturar Animal',
  //     nome_completo:
  //       'Flagar o individuo capturando/apanhando o animal silvestre com vida; Exemplo: Passarinho na armadilha ou gaiola',
  //     palavra_chave: 'Capturar Animal',
  //     categoria: 'Fauna',
  //     tags: 'Capturar apanhar animal',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 25 da Resolução SIMA N° 05/2021, por capturar animal (is) silvestre (s) da(s) espécie (s)_______________, mediante atividade de caça. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Com o infrator foi localizado (tipo da arma de fogo, instrumento ou armadilha)_____________. Tal crime foi constatado no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). O infrator, o instrumento de caça e o animal capturado foram encaminhados ao (informar o distrito policial)_______________ para lavratura do boletim de ocorrência e registro da apreensão.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.CapturarAnimal),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Animal Abatido',
  //     nome_completo:
  //       'Encontrar o animal de espécie nativa abatido sem a presença do infrator',
  //     palavra_chave: 'Animal Abatido',
  //     categoria: 'Fauna',
  //     tags: 'Animal abatido, abater animal',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a carcaça de um animal silvestre silvestre (s) da(s) espécie (s)_______________, provavelmente abatido em atividade de caça, tipificada no Art. 25 da Resolução SIMA N° 05/2021. Tal crime foi constatado no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). Provavelmente o animal foi abatido mediante (descrever a provável causa da morte do animal)_______________. Esta equipe efetuará novas diligências no local para coibir o crime constatado. ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.AnimalAbatido),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Aves',
  //     nome_completo:
  //       'Encontrar aves de espécies nativas engaioladas sem a devida autorização - Com a presença do infrator',
  //     palavra_chave: 'Fauna',
  //     categoria: 'Fauna',
  //     tags: 'Aves, Engaiolar',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por _________  Vender, expôr à venda, exportar ou adquirir, guardar, ter em cativeiro ou depósito, utilizar ou transportar ovos ou espécimes da fauna silvestre, nativa ou em rota migratória, bem como produtos e objetos dela oriundos, provenientes de criadouros não autorizados, sem a devida permissão, licença ou autorização da autoridade ambiental competente ou em desacordo com a obtida), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 § 3º da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Aves),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Fauna',
  //     nome_completo:
  //       'Flagrar o individuo mantendo em cativeiro ou depósito ovos, larvas.',
  //     palavra_chave: 'Fauna',
  //     categoria: 'Fauna',
  //     tags: 'Cativeiro, Deposito, Ovos, Larvas',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por _________ Vender, expôr à venda, exportar ou adquirir, guardar, ter em cativeiro ou depósito, utilizar ou transportar ovos, larvas ou espécimes da fauna silvestre, nativa ou em rota migratória, bem como produtos e objetos dela oriundos, provenientes de criadouros não autorizados, sem a devida permissão, licença ou autorização da autoridade ambiental competente ou em desacordo com a obtida), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 § 3º da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.OvosEmCativeiro),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Fauna',
  //     nome_completo:
  //       'Flagar o individuo - transportando ovos, larvas ou espécimes da fauna silvestre de fauna silvestre;',
  //     palavra_chave: 'Fauna',
  //     categoria: 'Fauna',
  //     tags: 'Transportar, Ovos, Larvas',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por _________ Vender, expôr à venda, exportar ou adquirir, guardar, ter em cativeiro ou depósito, utilizar ou transportar ovos, larvas ou espécimes da fauna silvestre, nativa ou em rota migratória, bem como produtos e objetos dela oriundos, provenientes de criadouros não autorizados, sem a devida permissão, licença ou autorização da autoridade ambiental competente ou em desacordo com a obtida), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 § 3º da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.OvosOuLarvasTransportadas),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Rancho',
  //     nome_completo: 'Rancho sem a presença do infrator',
  //     palavra_chave: 'Rancho',
  //     categoria: 'Fauna',
  //     tags: 'Rancho sem presenca infrator',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi encontrado rancho objetivando a caça, sem infrator presente, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RanchoSemInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Rancho',
  //     nome_completo: 'Rancho com a presença do infrator',
  //     palavra_chave: 'Rancho',
  //     categoria: 'Fauna',
  //     tags: 'Rancho com presenca infrator',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por construir rancho objetivando a caça, sem a devida permissão, licença ou Autorização da autoridade competente, ou em desacordo com a obtida, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 da Resolução SMA 48/2014 e dos  art. 29 § 4º e 40 da Lei Federal nº 9.605/1998  Art. 28. Praticar caça profissional no território do Estado de São Paulo (individualizar item)',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RanchoComInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Estaleiro',
  //     nome_completo: 'Estaleiro com a presença do infrator',
  //     palavra_chave: 'Estaleiro',
  //     categoria: 'Fauna',
  //     tags: 'Estaleiro com presença infrator',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por construirestaleiro objetivando a caça, sem a devida permissão, licença ou Autorização da autoridade competente, ou em desacordo com a obtida, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto dos arts. 25 e 69 da Resolução SMA 48/2014  e dos  art. 29 § 4º e 40 da Lei Federal nº 9.605/1998  Art. 28. Praticar caça profissional no território do Estado de São Paulo (individualizar item)',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.EstaleiroComInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Estaleiro',
  //     nome_completo: 'Estaleiro sem a presença do infrator',
  //     palavra_chave: 'Estaleiro',
  //     categoria: 'Fauna',
  //     tags: 'Estaleiro sem presença infrator',
  //     modelo: '',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.EstaleiroSemInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Estaleiro',
  //     nome_completo: 'Estaleiro com ceva sem a presença do infrator',
  //     palavra_chave: 'Estaleiro',
  //     categoria: 'Fauna',
  //     tags: 'Estaleiro com ceva sem presença do infrator',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi encontrado estaleiro com ceva objetivando a caça, sem infrator presente, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.EstaleiroComSevaSemInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Ninho Retirar',
  //     nome_completo:
  //       'Quando o indíviduo for flagrado alterando/modificar as características originais sem que para tanto cause dano ou inutilize o ninho. Exemplo - Retirar um ninho de João-de-barro de uma árvore e colocá-lo em outro local; ',
  //     palavra_chave: 'Ninho Retirar',
  //     categoria: 'Fauna',
  //     tags: 'Ninho retirar alterar modificar ',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por _________ (Modificar ou destruir ninho, abrigo ou criadouro natural)no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 § 3º da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RetirarNinho),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Ninho Destruir',
  //     nome_completo:
  //       'Quando o individuo for flagrado danificando, ou mesmo inutizando  parcialmente, o ninho, abrigo ou criadouro. Exemplo - atirar pedra na casa do joão de barro',
  //     palavra_chave: 'Ninho Destruir',
  //     categoria: 'Fauna',
  //     tags: 'Ninho destruir denificar inutilizar',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por danificar ninho  ________no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 § 3º da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.DestruirNinho),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Reintroduzir',
  //     nome_completo:
  //       'O animal é retirado do seu habitat  e depois devolvido. Ex: animais retirados do seu habitat natural por meio de caça; levado para local especializado em tratamento em geral; animais criados em cativeiro...',
  //     palavra_chave: 'Reintroduzir animal',
  //     categoria: 'Fauna',
  //     tags: 'Reintroduzir animal, habitat',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por  reintroduzir na natureza espécime da fauna silvestre denominada_________sem parecer técnico oficial favorável e licença expedida pela autoridade ambiental competente, quando exigível, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 26 § 2º da Resolução SMA 48/2014 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.ReintroduzirAnimal),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Caça Profissional',
  //     nome_completo:
  //       'Modalidade de caça em que o infrator a realiza com a finalidade de comércio. Exemplo:  o infrator que apanha um animal por encomenda de terceiro ou aquele caçador que fornece carne (tatu galinha, capivara etc.) para comércios em geral. ',
  //     palavra_chave: 'Caça Profissional',
  //     categoria: 'fauna',
  //     tags: 'Caça profissional, animal morto',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por praticar caça profissional no território do estado de São Paulo sem parecer técnico oficial favorável e licença expedida pela autoridade ambiental competente, quando exigível, mediante _____no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 28. da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º ,§ 5º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.CaçaProfissionalAnimalMorto),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Caça Profissional',
  //     nome_completo: 'Flagar o caçador com o animal vivo',
  //     palavra_chave: 'Caça Profissional',
  //     categoria: 'fauna',
  //     tags: 'Caça profissional, animal morto',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por praticar caça profissional no território do estado de São Paulo sem parecer técnico oficial favorável e licença expedida pela autoridade ambiental competente, quando exigível, mediante _____no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 28. da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º ,§ 5º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.CaçaProfissionalAnimalVivo),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Maus-tratos',
  //     nome_completo:
  //       'Quando forem encontrados animais: - Mantidos em recintos impróprios, debilitados por falta de alimento; - ofender ou agredir fisicamente os animais; -mantidos em local desprovido de asseio ou que lhes impeça a movimentação, o descanso ou os privem de ar e luminosidade;  -  enclausurados conjuntamente com outros que os molestem.',
  //     palavra_chave: 'Maus-tratos',
  //     categoria: 'Fauna',
  //     tags: 'Maus-tratos, abuso',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por praticar ato de ________(abuso, maus tratos, ferir ou mutilar animais silvestres, domésticos ou domesticados, nativos ou exóticos), ou realizar ________(experiência dolorosa ou cruel em animal vivo, ainda que para fins didáticos ou científicos, quando existirem recursos alternativos),no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 29. da Resolução SMA 48/2014 e do art.32.da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.MausTratos),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Pesca',
  //     nome_completo: 'Quando o indíviduo for flagrado pescando dentro da UC.',
  //     palavra_chave: 'Pesca',
  //     categoria: 'Fauna',
  //     tags: 'Pesca, local proibido',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por pescar em período ou local no qual a pesca seja proibida, mediante _____no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 28. da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º ,§ 5º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Pesca),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Pesca',
  //     nome_completo:
  //       'Quando o indivíduo for flagrado utilizando explosivos ou substâncias toxicas para pescar;',
  //     palavra_chave: 'Pesca',
  //     categoria: 'Fauna',
  //     tags: 'Pesca, local proibido',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por pescar em período ou local no qual a pesca seja proibida, mediante _____no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 28. da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º ,§ 5º da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Pesca),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Espécies exóticas fauna',
  //     nome_completo:
  //       'Fauna - quando for identificada a presença de animais não pertecentes a fauna nativa. Ex: Cachorro, galinha, cavalo...',
  //     palavra_chave: 'Espécies exóticas',
  //     categoria: 'Fauna',
  //     tags: 'Espécies exóticas, não pertencentes',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de/ o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por de introdução de espécie(s) alóctone(s) denominada(s) ________  no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto  dos art. 62 da Resolução SMA 48/2014 e do artigo 40 da Lei Federal nº 9.605/1998.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.EspecieExoticaFauna),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção e/ou ampliação (NÃO CONSOLIDADA), COM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, , com impedimento de regeneração (corte de vegetação em estágio pioneiro - gramíneas, arbustos, árvores até 15cm de diâmetro). FLAGRANTE OU NÃO',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, com presença do ocupante',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Foram flagrado (s) executando a construção as seguintes pessoas: _____(Nome completo). As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). OBS. 1: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres: 'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.'",
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.ConstrucaoOuAmpliacaoComOcupante),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (NÃO CONSOLIDADA), SEM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com impedimento de regeneração (corte de vegetação em estágio pioneiro - gramíneas, arbustos, árvores até 15cm de diâmetro).',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, sem presença do ocupante',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada.  As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. OBS.1: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc....',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.ConstrucaoOuAmpliacaoSemOcupante),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (FINALIZADA) constatada COM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com impedimento de regeneração (corte de vegetação em estágio pioneiro - gramíneas, arbustos, árvores até 15cm de diâmetro). SEM FLAGRANTE',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, com presença do ocupante',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). OBS. 1: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres: 'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.'",
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.ConstrucaoOuAmpliacaoComOcupante),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (FINALIZADA) constatada SEM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com impedimento de regeneração (corte de vegetação em estágio pioneiro - gramíneas, arbustos, árvores até 15cm de diâmetro).',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, sem presença do ocupante',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO) na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação.. As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. OBS.1: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc....',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.ConstrucaoOuAmpliacaoSemOcupante),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção e/ou ampliação (NÃO CONSOLIDADA), COM A PRESENÇA  do ocupante/ proprietário/ posseiro/funcionário, com corte de árvores isoladas (corte de árvores com mais de 15cm de diâmetro à altura do peito -DAP). Para a construção da estrutura foram cortadas árvores isoladas. FLAGRANTE OU NÃO',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, com presença do ocupante, com corte',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada, bem como no Art. 44 por cortar XX (quantidade de árvores cortadas) indivíduos arbóreos isolados. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Foram flagrado (s) executando a construção as seguintes pessoas: _____(Nome completo). As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). As árvores isoladas encontradas próximo ao __________ (descrever a estrutura mais próxima) estão localizadas nas seguintes coordenadas: Árvore 1 (palmeira-juçara): Lat. -XXXXXXX° / Long. -XXXXXXXXX°; Árvore 2 (manacá-da-serra): Lat. -XXXXXXX° / Long. -XXXXXXXXX°.  OBS. 1: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres: 'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.' OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista.",
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoComOcupanteComCorte,
  //     ),
  //   },
  // });
  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção e/ou ampliação (NÃO CONSOLIDADA), SEM A PRESENÇA  do ocupante/ proprietário/ posseiro/funcionário, com corte de árvores isoladas (corte de árvores com mais de 15cm de diâmetro à altura do peito -DAP). Para a construção da estrutura foram cortadas árvores isoladas.',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, sem presença do ocupante, com corte',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada, bem como no Art. 44 por cortar XX (quantidade de árvores cortadas) indivíduos arbóreos isolados.  As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). As árvores isoladas encontradas próximo ao __________ (descrever a estrutura mais próxima) estão localizadas nas seguintes coordenadas: Árvore 1 (palmeira-juçara): Lat. -XXXXXXX° / Long. -XXXXXXXXX°; Árvore 2 (manacá-da-serra): Lat. -XXXXXXX° / Long. -XXXXXXXXX°.  No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. OBS.1: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc.... OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista. ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoSemOcupanteComCorte,
  //     ),
  //   },
  // });
  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (FINALIZADA) constatada COM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com corte de árvores isoladas (corte de árvores com mais de 15cm de diâmetro à altura do peito -DAP). Para a construção da estrutura foram cortadas árvores isoladas.',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, com presença do ocupante, com supressão',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, bem como no Art. 44 por cortar XX (quantidade de árvores cortadas) indivíduos arbóreos isolados. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). As árvores isoladas encontradas próximo ao __________ (descrever a estrutura mais próxima) estão localizadas nas seguintes coordenadas: Árvore 1 (palmeira-juçara): Lat. -XXXXXXX° / Long. -XXXXXXXXX°; Árvore 2 (manacá-da-serra): Lat. -XXXXXXX° / Long. -XXXXXXXXX°.  OBS. 1: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres:  'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.' OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista.",
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoComOcupanteComCorte,
  //     ),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (FINALIZADA) constatada SEM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com corte de árvores isoladas (corte de árvores com mais de 15cm de diâmetro à altura do peito -DAP). Para a construção da estrutura foram cortadas árvores isoladas.',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, sem presença do ocupante, com corte',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO) na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção, bem como no Art. 44 por cortar XX (quantidade de árvores cortadas) indivíduos arbóreos isolados. As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm2; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm2 (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). As árvores isoladas encontradas próximo ao __________ (descrever a estrutura mais próxima) estão localizadas nas seguintes coordenadas: Árvore 1 (palmeira-juçara): Lat. -XXXXXXX° / Long. -XXXXXXXXX°; Árvore 2 (manacá-da-serra): Lat. -XXXXXXX° / Long. -XXXXXXXXX°.  No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. OBS.1: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc.... OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista. ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoSemOcupanteComCorte,
  //     ),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção e/ou ampliação (NÃO CONSOLIDADA), COM A PRESENÇA  do ocupante/ proprietário/ posseiro/funcionário, com SUPRESSÃO de vegetação nativa. Para a construção da estrutura foi realizada a supressão de vegetação nativa .FLAGRANTE OU NÃO',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, com presença do ocupante, com supressão',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada, bem como no Art. 49 por destruir ou danificar florestas ou qualquer tipo de vegetação nativa ou de espécies nativas plantadas, objeto de especial preservação, sem autorização ou licença do órgão ambiental competente. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Foram flagrado (s) executando a construção as seguintes pessoas: _____(Nome completo). As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm²; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm² (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). A área total suprimida foi mensurada em XXm²  OBS. 1: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres:  'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.' OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista.",
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoComOcupanteComSupressao,
  //     ),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção e/ou ampliação (NÃO CONSOLIDADA), SEM A PRESENÇA  do ocupante/ proprietário/ posseiro/funcionário, com SUPRESSÃO de vegetação nativa. Para a construção da estrutura foi realizada a supressão de vegetação nativa .',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, sem presença do ocupante, com supressão',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada, bem como no Art. 49 por destruir ou danificar florestas ou qualquer tipo de vegetação nativa ou de espécies nativas plantadas, objeto de especial preservação, sem autorização ou licença do órgão ambiental competente.  As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm²; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm² (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência).  No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. OBS.1: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc.... OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista. ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoSemOcupanteComSupressao,
  //     ),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (FINALIZADA) constatada COM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com  SUPRESSÃO de vegetação nativa. Para a construção da estrutura foi realizada a supressão de vegetação nativa .',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, com presença do ocupante, com supressão, finalizada',
  //     modelo:
  //       "Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada, bem como no Art. 49 por destruir ou danificar florestas ou qualquer tipo de vegetação nativa ou de espécies nativas plantadas, objeto de especial preservação, sem autorização ou licença do órgão ambiental competente. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Foram flagrado (s) executando a construção as seguintes pessoas: _____(Nome completo). As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm²; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm² (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). A área total suprimida foi mensurada em XXm²  OBS. 1: Caso não seja permitida a entrada para atendimento do procedimento operacional, colocar uma observação ao final da descrição da ocorrência com os seguintes dizeres: 'O infrator não permitiu a entrada da equipe para a realização do procedimento operacional, portanto, sugere-se que seja agendada operação integrada com a Polícia Militar Ambiental para as devidas providências.' OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista.",
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoComOcupanteComSupressao,
  //     ),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Construção e/ou Ampliação',
  //     nome_completo:
  //       'Construção/ampliação (FINALIZADA) constatada SEM A PRESENÇA do ocupante/ proprietário/ posseiro/funcionário, com  SUPRESSÃO de vegetação nativa. Para a construção da estrutura foi realizada a supressão de vegetação nativa .',
  //     palavra_chave: 'Construção ou ampliação',
  //     categoria: 'Ampliação e/ou Construção',
  //     tags: 'Ampliação ou construção, sem presença do ocupante, com supressão, finalizada',
  //     modelo:
  //       'Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 48 da Resolução SIMA N° 05/2021, por impedir ou dificultar a regeneração natural de florestas ou demais formas de vegetação nativa em unidade de conservação, mediante nova construção não consolidada, bem como no Art. 49 por destruir ou danificar florestas ou qualquer tipo de vegetação nativa ou de espécies nativas plantadas, objeto de especial preservação, sem autorização ou licença do órgão ambiental competente.  As construções constatadas são: 1-(Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.)________, coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° , mensurada em XXm²; 2- (Descreva o tipo da estrutura - Casa, edícula, contrapiso, calçada, etc.) _________ coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX°, mensurada em XXm² (descrever o tipo da construção, materiais empregados, medidas e coordenadas). Tais intervenções foram constatadas no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência).  No momento da diligência ninguém foi identificado no local, portanto, será necessária a refiscalização da área, visando qualificar o(s) infrator(es). Sugere-se ainda, que após a identificação do(s) infrator(es), seja agendada operação integrada com a Polícia Militar Ambiental para as demais providências. OBS.1: Informar, caso saiba, a qualificação do ocupante da área ao final do relatório dessa forma: De acordo com os registros feitos pela equipe de fiscalização, o último ocupante qualificado na área em tela é ________(Nome), CPF____________, RG____________, etc.... OBS. 2: Faça o máximo para identificar as espécies cortadas. Caso não consiga, peça ajuda para um especialista. ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(
  //       infracoes.ConstrucaoOuAmpliacaoSemOcupanteComSupressao,
  //     ),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Carvão',
  //     nome_completo:
  //       'Quando o indivíduo for flagrado transformando madeira oriunda da floresta ou demais formas de vegetação nativa em carvão.',
  //     palavra_chave: 'Carvão',
  //     categoria: 'Flora',
  //     tags: 'Carvão, madeira',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por Transformar  _____madeira oriunda de floresta ou demais formas de vegetação nativa em carvão, para fins industriais, energéticos ou para qualquer outra exploração, econômica ou não, sem licença ou em desacordo com as determinações legais no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 47. da Resolução SMA 48/2014 e do art.45 (madeira de lei) da Lei Federal nº 9.605/1998 ',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Carvao),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Madeira Transporte',
  //     nome_completo:
  //       'Flagrar o individuo tranportando madeira sem autorização.',
  //     palavra_chave: 'Madeira Transporte',
  //     categoria: 'Flora',
  //     tags: 'Transporte de madeira',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por  _____ Vender, expor à venda, ter em depósito, transportar ou guardar madeira, lenha, carvão ou outros produtos de origem vegetal, sem licença válida para todo o tempo da viagem ou do armazenamento, outorgada pela autoridade competente ou em desacordo com a obtida na Zona de Amortecimento do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 48. da Resolução SMA 48/2014 e do art.45 da Lei Federal nº 9.605/1998',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.TransporteMadeira),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Roçada',
  //     nome_completo:
  //       'Indivíduo roçando área com vegetação em estágio PIONEIRO (gramíneas , herbáceas, etc) utilizando instrumento de corte (roçadeira, ferramentas manuais, etc.) , dentro ou fora de propriedade/posse.',
  //     palavra_chave: 'Roçada',
  //     categoria: 'Flora',
  //     tags: 'Roçada com infrator',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por _________ (impedir ou dificultar) a regeneração natural de__________ (floresta ou demais formas de vegetação nativa), em área correspondente a ______ ha, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 49 da Resolução SMA 48/2014 e do artigo 48 da Lei Federal nº 9.605/1998.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RocadaComInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Roçada',
  //     nome_completo:
  //       'Área roçada em uma propriedade/posse sem a presença do infrator/proprietário/posseiro',
  //     palavra_chave: 'Roçada',
  //     categoria: 'Flora',
  //     tags: 'Roçada sem infrator em uma propriedade',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de _________ (impedir ou dificultar) a regeneração natural de__________ (floresta ou demais formas de vegetação nativa), em área correspondente a ______ ha, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 49 da Resolução SMA 48/2014 e do artigo 48 da Lei Federal nº 9.605/1998. A intervenção ocorreu na propriedade/posse pertencente a _______, porém no momento da diligência, ninguem se encontrava no local.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RocadaSemInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Roçada',
  //     nome_completo:
  //       'Área roçada fora de uma propriedade sem a presença do infrator',
  //     palavra_chave: 'Roçada',
  //     categoria: 'Flora',
  //     tags: 'Roçada sem infrator fora da propriedade',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de _________ (impedir ou dificultar) a regeneração natural de__________ (floresta ou demais formas de vegetação nativa), em área correspondente a ______ ha, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 49 da Resolução SMA 48/2014 e do art. 48 da Lei Federal nº 9.605/1998. A intervenção ocorreu próximo à propriedade/posse pertencente a _______, porém no momento da diligência, ninguem se encontrava no local.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RocadaSemInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Embargo + Roçada',
  //     nome_completo: 'Area roçada em área embargada sem a presença do infrator',
  //     palavra_chave: 'Embargo + Roçada',
  //     categoria: 'Flora',
  //     tags: 'Roçada sem infrator fora da propriedade',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de _________ (impedir ou dificultar) a regeneração natural de__________ (floresta ou demais formas de vegetação nativa), em área correspondente a ______ ha, no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo nos dispostos dos art. 49 e 75 da Resolução SMA 48/2014 e do art. 48 da Lei Federal nº 9.605/1998. A intervenção ocorreu  em área embargada próximo à propriedade/posse pertencente a _______, porém no momento da diligência, ninguem se encontrava no local',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.RocadaSemInfrator),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Desmatamento/Bosqueamento',
  //     nome_completo:
  //       'Indivíduo destruindo floresta ou qualquer tipo de vegetação nativa (desmatamento ou supressão de vegetação)',
  //     palavra_chave: 'Desmatamento/Bosqueamento',
  //     categoria: 'Flora',
  //     tags: 'Desmatamento, bosqueamento, destruição de floresta',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de ___________(destruir ou danificar) ____ha de vegetação____________________ (nativa ou de espécies nativas plantadas) ____________________ (em estágio inicial, em estágio médio, em estágio avançado ou primária), mediante__________________ (desmatamento/ supressão de vegetação), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto  dos art. 50 da Resolução SMA 48/2014 e da Lei Federal nº 9.605/1998',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Desmatamento),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Desmatamento/Bosqueamento',
  //     nome_completo:
  //       'Indivíduo danificando floresta ou qualquer tipo de vegetação nativa (bosqueamento, anelando árvores, cerca pregada nas árvores, pisoteio de animais, etc.)',
  //     palavra_chave: 'Desmatamento/Bosqueamento',
  //     categoria: 'Flora',
  //     tags: 'Desmatamento, bosqueamento, destruição de floresta',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de ___________(destruir ou danificar) ____ha de vegetação____________________ (nativa ou de espécies nativas plantadas) ____________________ (em estágio inicial, em estágio médio, em estágio avançado ou primária), mediante__________________ (bosqueamento, anelamento de árvores, cerca pregada nas árvores, pisoteio de animais), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto  dos art. 50 da Resolução SMA 48/2014 e da Lei Federal nº 9.605/1998',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Desmatamento),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Espécies exóticas flora',
  //     nome_completo:
  //       'Flora - Quando na área for identificado plantio de espécies não pertecentes a vegetação nativa. Ex: bananeira, limoeiro, laranjeira, espécies ornamentais...',
  //     palavra_chave: 'Espécies exóticas flora',
  //     categoria: 'Flora',
  //     tags: 'Espécies, exóticas, flora, espécie não pertencente, vegetação nativa',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), foi constatado o crime de/ o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por de introdução de espécie(s) alóctone(s) denominada(s) ________  no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto  dos art. 62 da Resolução SMA 48/2014.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.EspecieExoticaFlora),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Areia',
  //     nome_completo: 'Quando o individuo for flagrado retirando areia do rio',
  //     palavra_chave: 'Areia',
  //     categoria: 'Mineração',
  //     tags: 'Areia retirada do rio',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por Extrair de florestas de domínio público ou consideradas de preservação permanente, sem prévia autorização  ________ (pedra, areia, cal ou qualquer espécie de minerais), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 46. da Resolução SMA 48/2014 e do art.44 da Lei Federal nº 9.605/1998',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Areia),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Visitação',
  //     nome_completo:
  //       'Individuo for encontrado visitando atrativos da UC sem autorização;',
  //     palavra_chave: 'Visitação',
  //     categoria: 'Uso Público Irregular',
  //     tags: 'visitando, sem autorização',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por penetrar no  interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto  dos art. 70 da Resolução SMA 48/2014   e do art. 40 da Lei Federal nº 9.605/1998.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Visitacao),
  //   },
  // });

  // await prisma.exemplocaso.create({
  //   data: {
  //     nome_resumo: 'Pesquisa',
  //     nome_completo:
  //       'Quando o individuo for flagrado dentro da UC desenvolvendo pesquisa (coletando material ou não, colocando armadilha...) sem autorização do órgão gestor, ou seja, sem cadastro do Projeto no COTEC.',
  //     palavra_chave: 'Pesquisa',
  //     categoria: 'Pesquisa',
  //     tags: 'desenvolvendo, pesquisa, sem autorização',
  //     modelo:
  //       'Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM),o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por  crime de realizar pesquisa cientifica denominada ________(envolvendo ou não coleta de material biológico) sem a devida autorização,quando esta for exigível)  no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto  dos art. 64 da Resolução SMA 48/2014  e do artigo 40 da Lei Federal nº 9.605/1998.',
  //     tipo_ocorrencia: '',
  //     campos: JSON.stringify(infracoes.Pesquisa),
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
