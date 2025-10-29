import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { updatePassword } from './models/updatePassword';
import { IsSelf } from './decorators/is-self.decorator';
import { IsAdmin } from './decorators/is-admin.decorator';
import { DeleteRequest } from './models/deleteRequest';
import { AdminGuard } from './guards/admin.guard';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { tipo_usuario } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminGuard)
  @Post('signup')
  @IsPublic()
 @Post('signup')
signup(@Body() user: CreateUserDto) {
  return this.authService.signup({
    ...user,
    tipo: tipo_usuario[user.tipo as keyof typeof tipo_usuario],
  });
}

  @Post('signin')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(LocalAuthGuard)
  profile(@Request() req: AuthRequest) {
    return req.user;
  }

  @IsSelf()
  @Put('updatePassword')
  async resetPassword(@Body() req: updatePassword) {
    // Exemplo simplificado:
    return this.authService.updatePassword(
      req.cpf,
      req.senhaAntiga,
      req.novaSenha,
      req.confirmaSenha,
    );
  }

  //fazer rota de reset restrita aos admins
  @UseGuards(AdminGuard)
  @Put('reset')
  @IsAdmin()
  async updatePassword(@Body() req: updatePassword) {
    // Exemplo simplificado:
    return this.authService.updateOwnPassword(
      req.novaSenha,
      req.confirmaSenha,
      req.cpf,
    );
  }

  //rota para reset de qualquer usário. Restrita a Admins
  @UseGuards(AdminGuard)
  @Put('resetAny')
  @IsAdmin()
  async updateAnyPassword(@Body() req: updatePassword) {
    // Exemplo simplificado:
    return this.authService.updateAnyPassword(
      req.senhaAdm,
      req.cpf,
      req.novaSenha,
    );
  }

  @UseGuards(AdminGuard)
  @IsAdmin() // marca essa rota como apenas para admins
  @Delete('delete')
  async deleteUser(@Body() req: DeleteRequest) {
    // Aqui você chama o service que faz a exclusão do usuário no banco
    // Exemplo simplificado:
    return await this.authService.deleteUserByCpf(req.cpf);
  }
}
