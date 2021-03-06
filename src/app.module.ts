require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AdministratorsModule } from './administrators/administrators.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
 import { AuthModule } from './auth/auth.module';
import { VolunteersModule } from './Volunteers/Volunteers.module';



@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
        MulterModule.register({
          dest: './src/img',
        }),
        AuthModule,
      ],
  controllers: [AppController],
  providers: [AppService,],
})

export class AppModule {

}
