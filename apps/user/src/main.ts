import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../micro-services/src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  });
  await app.listen();
  console.log('User microservice is listening on port 3002 🚀');
}
bootstrap();
