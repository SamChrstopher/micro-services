import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: parseInt(process.env.PORT || '3004', 10),
    },
  });
  await app.listen();
    console.log('Product microservice is listening on port 3004 🚀');
}
bootstrap();
