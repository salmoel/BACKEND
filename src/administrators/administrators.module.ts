import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';

import { AdministratorsController } from './administrators.controller';
import { AdministratorsService } from './administrators.service';
import { AdministratorsSchema } from './administrators.schema';
import { UploadimagesadministratorsService } from './uploadimagesadministrators.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Administrator', schema: AdministratorsSchema }]),
        forwardRef(() => AuthModule)
    ],
    
    controllers: [
        AdministratorsController,],
    providers: [
        AdministratorsService, UploadimagesadministratorsService],
        exports:[AdministratorsService]
})
export class AdministratorsModule { }
