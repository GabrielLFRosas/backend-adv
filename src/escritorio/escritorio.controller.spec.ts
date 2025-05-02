import { Test, TestingModule } from '@nestjs/testing';
import { EscritorioController } from './escritorio.controller';

describe('EscritorioController', () => {
  let controller: EscritorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscritorioController],
    }).compile();

    controller = module.get<EscritorioController>(EscritorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
