import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  // @Get('find')
  // async findByFullname(@Query('substring') substring: string) {
  //   return this.adminService.findByFullname(substring);
  // }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.adminService.getUserByUsername(username);
  }

  @Post('delete/:username')
  async deleteUserByUsername(@Param('username') username: string) {
    return this.adminService.deleteUserByUsername(username);
  }
}
