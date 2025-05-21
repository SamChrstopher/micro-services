// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigService } from '@nestjs/config';
// import { UsersModule } from 'apps/user/src/users.module';
// @Module({
//   imports: [
//       ConfigModule.forRoot({isGlobal: true}),
//       MongooseModule.forRootAsync({
//           imports:[ConfigModule],
//           inject: [ConfigService],
//           useFactory: async (config: ConfigService)=>({
//               uri:config.get<string>('MONGO_URI')
//           })
//       }),
//       UsersModule
//     ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../user/src/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Load .env globally
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),  // MongoDB URI from .env
      }),
    }),
    UsersModule,  // Your user feature module
  ],
})
export class AppModule {}

