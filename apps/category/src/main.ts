// src/main.ts
import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CategoryModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3005, 
      },
    },
  );

  await app.listen();
  console.log('Category microservice is listening on port 3005 🚀');
}
bootstrap();
