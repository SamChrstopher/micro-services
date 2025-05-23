// src/main.ts
import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(CategoryModule);

    //Allow all the origins to connect to everyone
    app.enableCors({
      origin: '*',
      credential: true,
    });

    const configService = app.get(ConfigService);

    // HTTP server
    const httpPort = configService.get<number>('HTTP_PORT') || 3006;
    await app.listen(httpPort);
    logger.log(`HTTP service running on http://localhost:${httpPort}`);

    // TCP microservice
    const tcpPort = configService.get<number>('TCP_PORT') || 3007;
    const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: tcpPort,
      },
    });

    await app.startAllMicroservices();
    logger.log(`TCP microservice running on port ${tcpPort}`);
  } catch (error) {
    logger.error('Failed to start application', error.stack);
    process.exit(1);
  }
}
bootstrap();
