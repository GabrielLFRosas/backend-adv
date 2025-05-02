import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EscritorioModule } from './escritorio/escritorio.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProcessoModule } from './processo/processo.module';
import { HonorarioModule } from './honorario/honorario.module';
import { Prisma } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => EscritorioModule), ClienteModule, ProcessoModule, HonorarioModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
