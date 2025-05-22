import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3004;
  await app.listen(port);
  console.log(`User service is running on http://localhost:${port}`);
}
bootstrap();
