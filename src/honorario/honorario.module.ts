import { Module } from '@nestjs/common';
import { HonorarioController } from './honorario.controller';
import { HonorarioService } from './honorario.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HonorarioController],
  providers: [HonorarioService]
})
export class HonorarioModule {}
