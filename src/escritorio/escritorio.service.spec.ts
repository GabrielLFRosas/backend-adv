import { Test, TestingModule } from '@nestjs/testing';
import { EscritorioService } from './escritorio.service';

describe('EscritorioService', () => {
  let service: EscritorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscritorioService],
    }).compile();

    service = module.get<EscritorioService>(EscritorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
