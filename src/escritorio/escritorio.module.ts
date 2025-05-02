import { Module } from '@nestjs/common';
import { EscritorioController } from './escritorio.controller';
import { EscritorioService } from './escritorio.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EscritorioController],
  providers: [EscritorioService],
  exports: [EscritorioService],
})
export class EscritorioModule {}
