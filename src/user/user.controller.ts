import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

import { DeleteRequest } from 'src/auth/models/deleteRequest';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

}