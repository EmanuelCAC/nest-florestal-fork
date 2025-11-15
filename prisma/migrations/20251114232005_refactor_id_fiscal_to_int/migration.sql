/*
  Warnings:

  - You are about to drop the column `cpf` on the `autoinfracao` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `autoinfracao` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `autoinfracao` table. All the data in the column will be lost.
  - You are about to drop the column `naturezadano` on the `exemplocaso` table. All the data in the column will be lost.
  - You are about to drop the column `palavrachave` on the `exemplocaso` table. All the data in the column will be lost.
  - The primary key for the `fiscal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CPF` on the `fiscal` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `fiscal` table. All the data in the column will be lost.
  - You are about to drop the column `Senha` on the `fiscal` table. All the data in the column will be lost.
  - You are about to drop the column `Tipo` on the `fiscal` table. All the data in the column will be lost.
  - You are about to drop the column `cordenadas` on the `relatoriodiario` table. All the data in the column will be lost.
  - You are about to drop the column `horas` on the `relatoriodiario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_veiculo_aborado` on the `relatoriodiario` table. All the data in the column will be lost.
  - You are about to drop the column `veiculos_aborados` on the `relatoriodiario` table. All the data in the column will be lost.
  - You are about to drop the `infracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `relatorio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `fiscal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_fiscal` to the `autoinfracao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria` to the `exemplocaso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_completo` to the `exemplocaso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `fiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `fiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `fiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `fiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `fiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordenadas` to the `relatoriodiario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horas_percorridas` to the `relatoriodiario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `autoinfracao` DROP FOREIGN KEY `autoinfracao_cpf_fkey`;

-- DropForeignKey
ALTER TABLE `relatorio` DROP FOREIGN KEY `Relatorio_CPF_Fiscal_fkey`;

-- DropForeignKey
ALTER TABLE `relatorio` DROP FOREIGN KEY `Relatorio_ID_Infracao_fkey`;

-- DropIndex
DROP INDEX `autoinfracao_cpf_fkey` ON `autoinfracao`;

-- AlterTable
ALTER TABLE `autoinfracao` DROP COLUMN `cpf`,
    DROP COLUMN `lat`,
    DROP COLUMN `lon`,
    ADD COLUMN `id_fiscal` INTEGER NOT NULL,
    MODIFY `data_emissao` DATETIME(3) NOT NULL,
    MODIFY `descricao` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `exemplocaso` DROP COLUMN `naturezadano`,
    DROP COLUMN `palavrachave`,
    ADD COLUMN `campos` TEXT NULL,
    ADD COLUMN `categoria` TEXT NOT NULL,
    ADD COLUMN `nome_completo` TEXT NOT NULL,
    ADD COLUMN `nome_resumo` TEXT NULL,
    ADD COLUMN `palavra_chave` TEXT NULL,
    ADD COLUMN `tags` TEXT NULL,
    ADD COLUMN `tipo_ocorrencia` TEXT NULL,
    MODIFY `proc_op` TEXT NOT NULL,
    MODIFY `proc_adm` TEXT NOT NULL,
    MODIFY `enq_pen` TEXT NOT NULL,
    MODIFY `enq_adm` TEXT NOT NULL,
    MODIFY `modelo` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `fiscal` DROP PRIMARY KEY,
    DROP COLUMN `CPF`,
    DROP COLUMN `Nome`,
    DROP COLUMN `Senha`,
    DROP COLUMN `Tipo`,
    ADD COLUMN `cpf` VARCHAR(11) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipo` ENUM('Campo', 'Administrativo', 'Admin') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `relatoriodiario` DROP COLUMN `cordenadas`,
    DROP COLUMN `horas`,
    DROP COLUMN `tipo_veiculo_aborado`,
    DROP COLUMN `veiculos_aborados`,
    ADD COLUMN `coordenadas` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `horas_percorridas` VARCHAR(191) NOT NULL,
    ADD COLUMN `processado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tipo_veiculo_abordado` ENUM('carro', 'moto', 'caminhao', 'onibusVan') NULL,
    ADD COLUMN `veiculos_abordados` VARCHAR(191) NULL,
    MODIFY `km_inicio` VARCHAR(191) NULL,
    MODIFY `km_final` VARCHAR(191) NULL,
    MODIFY `km_percorrido` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `infracao`;

-- DropTable
DROP TABLE `relatorio`;

-- CreateIndex
CREATE INDEX `autoinfracao_id_fiscal_fkey` ON `autoinfracao`(`id_fiscal`);

-- CreateIndex
CREATE UNIQUE INDEX `fiscal_cpf_key` ON `fiscal`(`cpf`);

-- CreateIndex
CREATE INDEX `relatoriodiario_fiscalId_fkey` ON `relatoriodiario`(`fiscalId`);

-- AddForeignKey
ALTER TABLE `autoinfracao` ADD CONSTRAINT `autoinfracao_id_fiscal_fkey` FOREIGN KEY (`id_fiscal`) REFERENCES `fiscal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relatoriodiario` ADD CONSTRAINT `relatoriodiario_fiscalId_fkey` FOREIGN KEY (`fiscalId`) REFERENCES `fiscal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
