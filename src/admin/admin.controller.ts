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
import { diskStorage, MulterError } from 'multer';

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
  @UseInterceptors(
    FileInterceptor('nidImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) cb(null, true);
        else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      },
    }),
  )
  createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): string | object {
    console.log(file.path);
    dto.nidImage = file.path;
    return this.adminService.createUser(dto);
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
