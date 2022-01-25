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
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  //  consulta quantidade de usuários
  @Get()
  async getLengthUser(@Param('typeUser') typeUser: string): Promise<Object> {

    let lengthAllUsers = {}

    lengthAllUsers["voluntarios"] = await this.dashboardService.getAllVolunteers() 

    lengthAllUsers["administradores"] = await this.dashboardService.getAllAdministrators();

    lengthAllUsers["missionarios"] = 0;
    //   return this.dashboardService.getAllMissionaries();

    return lengthAllUsers
  }

  //  consulta aniversariantes
  @UseGuards(JwtAuthGuard)
  @Get('/birthday')
  async getConsulta(): Promise<Object> {
    console.log("chamou")

    return "teste"
  }
}
