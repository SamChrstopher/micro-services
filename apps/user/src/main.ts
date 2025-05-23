import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  //Allow all the origins to connect to everyone
  app.enableCors({
    origin: '*',
    credential: true,
  });
  
  const configService = app.get(ConfigService);

  // HTTP server
  const httpPort = configService.get<number>('HTTP_PORT') || 3002;
  await app.listen(httpPort);
  console.log(`User HTTP service is running on http://localhost:${httpPort}`);

  // TCP microservice
  const tcpPort = configService.get<number>('TCP_PORT') || 3001;
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: tcpPort,
      },
    },
  );

  await tcpApp.listen();
  console.log(`User TCP service is running on port ${tcpPort}`);
}

bootstrap();
