import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AdministratorsModule } from './../administrators/administrators.module';
import { VolunteersModule } from '../Volunteers/Volunteers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { AuthController } from './auth.controller';


@Module({
  imports: [
    AdministratorsModule,
    VolunteersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7200s' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,

  ],
  exports: [JwtModule, AuthService]

})
export class AuthModule { }
