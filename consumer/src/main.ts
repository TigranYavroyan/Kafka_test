// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { INestApplication } from '@nestjs/common';

// async function bootstrap() {
//   const app: INestApplication = await NestFactory.create(AppModule);

//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.KAFKA,
//     options: {
//       client: {
//         clientId: 'consumer',
//         brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
//       },
//       consumer: {
//         groupId: 'consumer_group',
//       },
//     },
//   });

//   await app.startAllMicroservices();

//   const PORT = process.env.PORT ?? 3000;

//   await app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Listening on ${PORT}...`);
//   });
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'consumer-service',
          brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
        },
        consumer: {
          groupId: 'consumer_group',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
