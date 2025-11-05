import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  // PATCH /admin/update-user/:id
  @Patch('update-user/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.adminService.updateUser(Number(id), dto);
  }
}
