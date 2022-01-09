import { DashboardModule } from './dashboard/dashboard.module';

require('dotenv').config({
  path: (process.env.NODE_ENV = '.PRODUCTION.env'),
  // path: process.env.NODE_ENV =  ".DEVELOPMENT.env"
});
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AdministratorsModule } from './administrators/administrators.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VolunteersModule } from './Volunteers/volunteers.module';

@Module({
  imports: [
    // AdministratorsModule,
    DashboardModule,
    // VolunteersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    MulterModule.register({}),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
