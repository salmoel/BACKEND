import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoluntarySchema } from 'src/Volunteers/voluntary.schema';
import { AdministratorsSchema } from 'src/administrators/administrators.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Voluntary', schema: VoluntarySchema },
      { name: 'Administrator', schema: AdministratorsSchema }
    ],),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
