import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HostEntity } from '../host/host.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(HostEntity)
    private readonly hostRepo: Repository<HostEntity>,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const host = await this.hostRepo.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'passwordHash', 'fullName'],
    });

    if (!host) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(loginDto.password, host.passwordHash);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return host;
  }

  async login(loginDto: LoginDto) {
    const host = await this.validateUser(loginDto);
    const payload = { sub: host.id, email: host.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
