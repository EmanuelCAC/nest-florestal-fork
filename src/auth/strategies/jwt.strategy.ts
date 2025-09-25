import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/userFromJwt';
import { UserPayload } from '../models/userPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // extrai o token do header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // ignora a expiracao
      ignoreExpiration: false,

      // acessa o segredo do jwt no arquivo .env
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      cpf: payload.cpf,
      nome: payload.nome,
      tipo: payload.tipo,
    };
  }
}
