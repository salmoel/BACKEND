import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const administrator = await this.authService.validateAdministrator(email, password);
    const voluntary = await this.authService.validateVoluntary(email, password);

    if (!administrator) {
      console.log('administrador não encontrado');
      if (!voluntary) {
        console.log('voluntario não encontrado');
        throw new UnauthorizedException();
      } else {
        return voluntary;
      }
      // throw new UnauthorizedException();
    } else {
      return administrator;
    }
  }
}