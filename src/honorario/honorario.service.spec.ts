import { Test, TestingModule } from '@nestjs/testing';
import { HonorarioService } from './honorario.service';

describe('HonorarioService', () => {
  let service: HonorarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HonorarioService],
    }).compile();

    service = module.get<HonorarioService>(HonorarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
