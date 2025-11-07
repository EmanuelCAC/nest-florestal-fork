import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { IS_ADMIN_KEY } from '../decorators/is-admin.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verifica se o metadata @IsAdmin está presente
    const isAdminRequired = this.reflector.getAllAndOverride<boolean>(
      IS_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isAdminRequired) {
      // Se não tiver o decorator, não precisa ser admin
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.tipo !== 'Admin') {
      // console.log(user)
      throw new ForbiddenException(
        'Acesso permitido apenas para administradores.',
      );
    }

    return true;
  }
}
