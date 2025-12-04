import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity } from './entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(CouponEntity) private repo: Repository<CouponEntity>,
  ) {}
  create(dto: CreateCouponDto) {
    const coupon = this.repo.create(dto);
    return this.repo.save(coupon);
  }

  async findOne(id: number) {
    const coupon = await this.repo.findOneBy({ id });
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }
}
