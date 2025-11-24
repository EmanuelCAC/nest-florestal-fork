import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriodiarioController } from './relatoriodiario.controller';
import { RelatoriodiarioService } from './relatoriodiario.service';

describe('RelatoriodiarioController', () => {
  let controller: RelatoriodiarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelatoriodiarioController],
      providers: [RelatoriodiarioService],
    }).compile();

    controller = module.get<RelatoriodiarioController>(RelatoriodiarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
