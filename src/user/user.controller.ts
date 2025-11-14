import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AdminGuard)
  @IsAdmin()
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }
}