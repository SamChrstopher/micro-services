import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CategoryModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3002;
  await app.listen(port);
  console.log(`Category service is running on http://localhost:${port}`);
}
bootstrap();
