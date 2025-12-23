import { Controller, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BackupService } from './backup.service';
import { IsAdmin } from '../auth/decorators/is-admin.decorator';
import * as path from 'path';
import * as fs from 'fs';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  /**
   * Restaura o banco de dados a partir de um backup criptografado
   * ATENÇÃO: Esta operação sobrescreverá todos os dados do banco atual!
   * Recebe o arquivo .encrypted via upload
   */
  @Post('restore')
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async restoreBackup(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Arquivo de backup criptografado é obrigatório');
    }

    if (!file.originalname.endsWith('.encrypted')) {
      throw new BadRequestException('O arquivo deve ser um backup criptografado (.encrypted)');
    }

    // Salva o arquivo temporariamente
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, `restore_${Date.now()}_${file.originalname}`);
    
    try {
      // Salva o arquivo enviado
      fs.writeFileSync(tempFilePath, file.buffer);

      // Restaura o banco de dados
      await this.backupService.restoreFromEncryptedBackup(tempFilePath);

      // Remove o arquivo temporário
      fs.unlinkSync(tempFilePath);

      return {
        success: true,
        message: 'Banco de dados restaurado com sucesso',
        filename: file.originalname,
      };
    } catch (error: any) {
      // Remove o arquivo temporário em caso de erro
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }

      return {
        success: false,
        message: 'Erro ao restaurar banco de dados',
        error: error.message,
      };
    }
  }
}
