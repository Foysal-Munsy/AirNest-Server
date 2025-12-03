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
  //   const results = await this.userRepository.find({
  //     where: { fullname: ILike(`%${substring}%`) },
  //   });
  //   if (!results.length) {
  //     throw new NotFoundException('No admins found for provided fullname');
  //   }
  //   return results;
  // }

  // async getUserByUsername(username: string): Promise<AdminEntity | null> {
  //   const result = await this.userRepository.findOneBy({ username: username });
  //   if (!result) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return result;
  // }

  // async deleteUserByUsername(username: string): Promise<{ message: string }> {
  //   const result = await this.userRepository.delete({ username });
  //   if (!result.affected) throw new NotFoundException('User not found');
  //   return { message: 'User deleted successfully' };
  // }
}
