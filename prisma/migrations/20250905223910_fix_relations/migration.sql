-- CreateTable
CREATE TABLE `autoinfracao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_emissao` TIMESTAMP(6) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `lat` INTEGER NOT NULL,
    `lon` INTEGER NOT NULL,
    `id_exemplocaso` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `relatoriodiarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exemplocaso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `palavrachave` VARCHAR(191) NOT NULL,
    `naturezadano` VARCHAR(191) NOT NULL,
    `proc_op` VARCHAR(191) NOT NULL,
    `proc_adm` VARCHAR(191) NOT NULL,
    `enq_pen` VARCHAR(191) NOT NULL,
    `enq_adm` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal` (
    `id` INTEGER NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipo` ENUM('fiscal', 'administrador') NOT NULL,

    UNIQUE INDEX `fiscal_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relatoriodiario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipe` ENUM('charlie_sede_diurno', 'charlie_rp_diurno', 'charlie_rp_noturno', 'delta_sede_diurno', 'delta_rp_diurno', 'delta_rp_noturno') NOT NULL,
    `equipe_em_atuacao` VARCHAR(191) NOT NULL,
    `orgaos_e_instituicoes_envolvadas` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `data_hora_inicio_acao` DATETIME(3) NOT NULL,
    `data_hora_termino_acao` DATETIME(3) NOT NULL,
    `origem` ENUM('rotina', 'planejamento_SIMUC', 'dejem_SIMUC', 'denuncia', 'atendimento_orgaos_externos', 'demanda_soliitacao_inerna') NOT NULL,
    `registro_ocorrencia` BOOLEAN NOT NULL,
    `area_fiscalizada` BOOLEAN NOT NULL,
    `municipios` ENUM('caraguatatuba', 'paraibuna', 'natividade_da_serra') NOT NULL,
    `setores` ENUM('caraguatatuba_norte', 'caraguatatuba_sul', 'alto_da_serra_norte', 'alto_da_serra_sul') NOT NULL,
    `especificacao_local` VARCHAR(191) NOT NULL,
    `relatorio` VARCHAR(191) NOT NULL,
    `outras_atividades` VARCHAR(191) NOT NULL,
    `cordenadas` VARCHAR(191) NOT NULL,
    `placa_vtr` VARCHAR(191) NULL,
    `km_inicio` INTEGER NULL,
    `km_final` INTEGER NULL,
    `condicoes_vtr` VARCHAR(191) NULL,
    `tipo_acao` ENUM('incursao_viatura', 'incrusao_pe', 'fiscalizacao_embarcada', 'sobrevoo', 'fiscalizacao_drone', 'bloqueio') NOT NULL,
    `veiculos_aborados` VARCHAR(191) NULL,
    `tipo_veiculo_aborado` ENUM('carro', 'moto', 'caminhao', 'onibusVan') NULL,
    `descricao_veiculos` VARCHAR(191) NULL,
    `km_percorrido` INTEGER NOT NULL,
    `horas` INTEGER NOT NULL,
    `fiscalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `autoinfracao` ADD CONSTRAINT `autoinfracao_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `fiscal`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `autoinfracao` ADD CONSTRAINT `autoinfracao_id_exemplocaso_fkey` FOREIGN KEY (`id_exemplocaso`) REFERENCES `exemplocaso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `autoinfracao` ADD CONSTRAINT `autoinfracao_relatoriodiarioId_fkey` FOREIGN KEY (`relatoriodiarioId`) REFERENCES `relatoriodiario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relatoriodiario` ADD CONSTRAINT `relatoriodiario_fiscalId_fkey` FOREIGN KEY (`fiscalId`) REFERENCES `fiscal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
