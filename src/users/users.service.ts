import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findOne(username: string): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async login(dto: LoginUserDto) {
    const user = await this.repo.findOneBy({ username: dto.username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _password, ...safeUser } = user;
    void _password;
    return {
      message: 'Login successful',
      user: safeUser,
    };
  }

  async remove(username: string) {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    await this.repo.remove(user);
    const { password: _password, ...safeUser } = user;
    void _password;
    return {
      message: 'User deleted',
      user: safeUser,
    };
  }
}
