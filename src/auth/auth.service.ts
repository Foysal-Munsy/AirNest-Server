import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  //   create user
  async signUp(dto: SignUpDto): Promise<UserEntity> {
    // console.log(dto);
    const existingUser = await this.usersService.findOne(dto.username);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    return this.usersService.createUser(dto);
  }

  //   login user
  async signIn(dto: SignInDto) {
    const user = await this.usersService.findOne(dto.username);
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
