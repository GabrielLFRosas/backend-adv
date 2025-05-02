import { Module } from '@nestjs/common';
import { ProcessoController } from './processo.controller';
import { ProcessoService } from './processo.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProcessoController],
  providers: [ProcessoService],
  exports: [ProcessoService],
})
export class ProcessoModule {}
