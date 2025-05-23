import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  //Allow all the origins to connect to everyone
  app.enableCors({
    origin: '*',
    credential: true,
  });
  
  const configService = app.get(ConfigService);

  // HTTP server on port 3004
  const httpPort = configService.get<number>('PORT') || 3004;
  await app.listen(httpPort);
  console.log(`HTTP service is running on http://localhost:${httpPort}`);

  // TCP microservice on port 3005
  const tcpPort = configService.get<number>('TCP_PORT') || 3005;
  const tcpHost = configService.get<string>('TCP_HOST') || '127.0.0.1';

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort,
    },
  });

  await app.startAllMicroservices();
  console.log(`TCP microservice is running on ${tcpHost}:${tcpPort}`);
}
bootstrap();

//TCP Communication (Interservice) & Registering TCP Microservices

//Setting up the port number for TCP Communication for other services to communicate to Product
//const tcpPort = config.get<number>('PORT')

//Registering the TCP Microservices
//app.connectMicroservice<MicroserviceOptions>({
//transport: Transport.TCP,
//options:{
//host: config.get<string>("PRODUCT_TCP_HOST"),
//port: tcpPort}
//})

//Start TCP Microservices
//await app.startAllMicroservice()

//Start HTTP server for image, upload and CRUD OPS
