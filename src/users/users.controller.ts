import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('signup')
  // async createUser(@Body() dto: CreateUserDto) {
  //   const salt = await bcrypt.genSalt();
  //   dto.password = await bcrypt.hash(dto.password, salt);
  //   return this.usersService.createUser(dto);
  // }

  // @Post('login')
  // async login(@Body() dto: LoginUserDto) {
  //   return this.usersService.login(dto);
  // }

  @UseGuards(AuthGuard)
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  // @UseGuards(AuthGuard)
  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() dto: CreateUserDto,
  ) {
    return this.usersService.update(username, dto);
  }

  @Roles('Admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.usersService.remove(username);
  }

  @Roles('Admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':username/role')
  async updateRole(
    @Param('username') username: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(username, dto.role);
  }

  // @Roles('Admin')
  // @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
