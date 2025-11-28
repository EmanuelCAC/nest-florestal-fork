import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';
import { AuthRequest } from 'src/auth/models/authRequest';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AdminGuard)
  @IsAdmin()
  @Get('/')
  findAll(@Req() req: AuthRequest) {
    return this.userService.findAll(req.user.id);
  }
}