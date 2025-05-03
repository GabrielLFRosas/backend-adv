import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['*'], // ou '*' (não recomendado em produção)
    credentials: true, // se estiver usando cookies/autenticação
  });
  await app.listen(3000);
}
bootstrap();
