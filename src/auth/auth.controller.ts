import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: SignInDto) {
    const user = await this.authService.signIn(dto);
    return user;
  }

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    const user = await this.authService.signUp(dto);
    return user;
  }
}
