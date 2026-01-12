import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.repo.create(dto);

    const savedUser = await this.repo.save(user);
    // console.log('Hello', savedUser);
    return savedUser;
  }

  async update(username: string, dto: CreateUserDto) {
    const user = await this.findOne(username);

    if (dto.password) {
      const bcrypt = await import('bcrypt');
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);
    }

    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async findOne(username: string): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // async login(dto: LoginUserDto) {
  //   const user = await this.repo.findOneBy({ username: dto.username });
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const passwordMatches = await bcrypt.compare(dto.password, user.password);
  //   if (!passwordMatches) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   // const { password: _password, ...safeUser } = user;
  //   // void _password;
  //   return {
  //     message: 'Login successful',
  //     user: user,
  //   };
  // }

  async remove(username: string) {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.repo.remove(user);

    return {
      message: 'User deleted',
      user,
    };
  }

  async updateRole(
    username: string,
    role: 'Admin' | 'Host' | 'Guest' | 'Support',
  ) {
    const user = await this.findOne(username);
    user.role = role;
    const savedUser = await this.repo.save(user);
    return {
      message: 'User role updated',
      user: savedUser,
    };
  }
  async findAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }
}
