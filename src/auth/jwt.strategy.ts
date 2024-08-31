import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'cd5548f7-ac9d-4948-9eef-55c18cf3ad7b', // A mesma chave usada no JwtModule
    });
  }

  async validate(payload: JwtPayload) {
    // Aqui você pode implementar qualquer lógica de validação adicional
    return { email: payload.email };
  }
}
