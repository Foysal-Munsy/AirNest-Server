import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // GET /admin/users
  @Get('users')
  getAllUsers(): string | object {
    return this.adminService.getAllUsers();
  }
  // GET /admin/user/:id
  @Get('user/:id')
  getUserById(@Param('id') id: string): string | object {
    return this.adminService.getUserById(Number(id));
  }
  // POST /admin/create-user
  @Post('create-user')
  @UseInterceptors(FileInterceptor('nidImage'))
  createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): string | object {
    if (file && file.size > 2 * 1024 * 1024) {
      return 'Image size must be less than 2MB';
    }
    return this.adminService.createUser({ ...dto, nidImage: file });
  }
  // PATCH /admin/update-user/:id
  @Patch('update-user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): string | object {
    return this.adminService.updateUser(Number(id), dto);
  }
  // DELETE /admin/delete-user/:id
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string): string | object {
    return this.adminService.deleteUser(Number(id));
  }
  // GET /admin/find-user?email=
  @Get('find-user')
  findUserByEmail(@Query('email') email: string): string | object {
    return this.adminService.findUserByEmail(email);
  }
  // PATCH /admin/reset-roles
  @Patch('reset-roles')
  resetRoles(): string | object {
    return this.adminService.resetUserRoles();
  }
  // GET /admin/count-users
  @Get('count-users')
  countUsers(): string | object {
    return this.adminService.countUsers();
  }
}
