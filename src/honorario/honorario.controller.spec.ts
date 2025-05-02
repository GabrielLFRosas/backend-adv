import { Test, TestingModule } from '@nestjs/testing';
import { HonorarioController } from './honorario.controller';

describe('HonorarioController', () => {
  let controller: HonorarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HonorarioController],
    }).compile();

    controller = module.get<HonorarioController>(HonorarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
