import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { IS_SELF_KEY } from '../decorators/is-self.decorator';

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isSelfRequired = this.reflector.getAllAndOverride<boolean>(
      IS_SELF_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isSelfRequired) {
      // Se não tiver o decorator, libera acesso para todos
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    const token = authorization.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error('error: secretKey is not defined');
    }

    const decodedToken = jwt.verify(token, secretKey);

    if (decodedToken['cpf'] !== request.params.cpf) {
      return false;
    }

    return true;
  }
}
