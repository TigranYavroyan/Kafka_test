import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const PORT = process.env.PORT ?? 3001;

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}...`);
  });
}
bootstrap();
