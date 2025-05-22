import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  //HTTP Communication between Postman and Product
  //This is the HTTP layer
  const app = await NestFactory.create(ProductsModule);
  //Adding ConfigService as middleware for .env configs
  const configService = app.get(ConfigService);
  //Registering the port no. for Product HTTP
  const port = configService.get<number>('PORT') || 3003;
  await app.listen(port);
  console.log(`Product service is running on http://localhost:${port}`);
}
bootstrap();

//TCP Communication (Interservice) & Registering TCP Microservices

//Setting up the port number for TCP Communication for other services to communicate to Product
//const tcpPort = config.get<number>('PORT')

//Registering the TCP Microservices
//app.connectMicroservice<MicroserviceOptions>({
//transport: Transport.TCP})