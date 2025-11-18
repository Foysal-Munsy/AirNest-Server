import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private userRepository: Repository<AdminEntity>,
  ) {}

  async createAdmin(dto: CreateAdminDto): Promise<AdminEntity> {
    const admin = this.userRepository.create(dto);
    return this.userRepository.save(admin);
  }

  // async findByFullname(substring: string): Promise<AdminEntity[]> {
  //   return this.userRepository.find({ where: { fullname: substring } });
  // }

  async getUserByUsername(username: string): Promise<AdminEntity | null> {
    return this.userRepository.findOneBy({ username: username });
  }
}
