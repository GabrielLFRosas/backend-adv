import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { EscritorioModule } from 'src/escritorio/escritorio.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [EscritorioModule, PrismaModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
