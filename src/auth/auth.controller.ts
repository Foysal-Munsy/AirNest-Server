import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @SetMetadata('public', true)
  @SetMetadata('skipAuth', true)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: SignInDto) {
    const user = await this.authService.signIn(dto);
    return user;
  }

  @SetMetadata('isPublic', true)
  @SetMetadata('public', true)
  @SetMetadata('skipAuth', true)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    const user = await this.authService.signUp(dto);
    return user;
  }
}
