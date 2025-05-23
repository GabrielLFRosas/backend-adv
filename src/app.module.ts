import { forwardRef, Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EscritorioModule } from './escritorio/escritorio.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProcessoModule } from './processo/processo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => EscritorioModule), ClienteModule, ProcessoModule, PrismaModule, AuthModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
