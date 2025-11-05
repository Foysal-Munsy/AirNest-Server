import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // GET /admin/users
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }
}
