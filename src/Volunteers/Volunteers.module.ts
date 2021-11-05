import {  forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { VoluntarySchema } from './voluntary.schema';
import { UploadImagesVolunteersService } from './uploadimagesvolunteers.service';
import { AuthModule } from './../auth/auth.module';


@Module({
  imports: [
  MongooseModule.forFeature([
    { name: 'Voluntary', schema: VoluntarySchema }
  ],),
    forwardRef(() => AuthModule)
    
  ],
  controllers: [VolunteersController],
  providers: [VolunteersService,  UploadImagesVolunteersService],
  exports:[VolunteersService],
})
export class VolunteersModule {}
