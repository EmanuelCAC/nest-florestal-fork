// NestJS
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// Password
import { AuthGuard } from '@nestjs/passport';
// Decorators
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  //se a requisição pode continuar ou nao
 async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //se a rota estiver marcada como publica, retorna true
    if (isPublic) {
      return true;
    }

    //chama o metodo do AuthGuard
    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((err) => {
      throw new UnauthorizedException(err.message);
    });
  }
}