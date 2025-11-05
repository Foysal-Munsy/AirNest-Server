import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // GET /admin/users
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // GET /admin/user/:id
  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(Number(id));
  }
  // POST /admin/create-user
  @Post('create-user')
  createUser(@Body() dto: CreateUserDto) {
    return this.adminService.createUser(dto);
  }
}
