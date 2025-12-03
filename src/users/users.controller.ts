import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RoleGuard } from '../auth/role.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);
    return this.usersService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(RoleGuard)
  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
