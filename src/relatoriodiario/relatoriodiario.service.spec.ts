import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriodiarioService } from './relatoriodiario.service';

describe('RelatoriodiarioService', () => {
  let service: RelatoriodiarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelatoriodiarioService],
    }).compile();

    service = module.get<RelatoriodiarioService>(RelatoriodiarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
