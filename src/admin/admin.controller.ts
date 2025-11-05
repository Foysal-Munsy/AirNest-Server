import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

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
}
