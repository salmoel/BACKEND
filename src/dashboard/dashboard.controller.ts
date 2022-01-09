import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  Param,
  Response,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('/:typeUser')
  async getLengthUser(@Param('typeUser') typeUser: string): Promise<Object> {

    let lengthAllUsers = {}

    lengthAllUsers["voluntarios"] = await this.dashboardService.getAllVolunteers()

    lengthAllUsers["administradores"] = await this.dashboardService.getAllAdministrators();

    lengthAllUsers["missionarios"] = 0;
    //   return this.dashboardService.getAllMissionaries();

    return lengthAllUsers
  }
}
