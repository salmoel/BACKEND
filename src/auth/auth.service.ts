import { VolunteersService } from './../Volunteers/volunteers.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { AdministratorsService } from './../administrators/administrators.service';
@Injectable()
export class AuthService {

  constructor(
    private volunteersService: VolunteersService,
    private administratorsService: AdministratorsService,
    private jwtService: JwtService
    ) {}

  async validateVoluntary(email: string, pass: string): Promise<any> {
    const user = await this.volunteersService.getByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password )) {
      const { _id, nome, email, typeUser } = user;
      return {id: _id, nome, email, type: typeUser };
    }
    return null;
  }
  async validateAdministrator(email: string, pass: string): Promise<any> {
    const user = await this.administratorsService.getByEmail(email);
    console.log(user);
    
    if (user && bcrypt.compareSync(pass, user.password )) {
      const { _id, nome, email, typeUser } = user;
      return {id: _id, nome, email, type: typeUser };
    }
    return null;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, type: user.type };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
