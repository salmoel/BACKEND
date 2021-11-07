import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
// import { Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { console.log(` ::::::::::::::::::::::::::::::::::    AMBIENTE  DE  ${process.env.AMBIENTE}   ::::::::::::::::::::::::::::::::::`)}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
