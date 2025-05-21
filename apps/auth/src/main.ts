import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(process.env.port ?? 3002);
    console.log('Auth microservice is listening on port 3002 🚀');

}
bootstrap();
