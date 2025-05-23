import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  //Allow all the origins to connect to everyone
  app.enableCors({
    origin:'*',
    credential:true
  })

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Auth service is running on http://localhost:${port}`);
}
bootstrap();