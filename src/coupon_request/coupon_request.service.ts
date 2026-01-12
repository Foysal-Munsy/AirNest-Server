import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponRequest } from './entities/coupon_request.entity';
import { CreateCouponRequestDto } from './dto/create-coupon_request.dto';
import { UsersService } from 'src/users/users.service';
import { CouponsService } from 'src/coupons/coupons.service';

@Injectable()
export class CouponRequestService {
  constructor(
    @InjectRepository(CouponRequest)
    private readonly couponRequestRepository: Repository<CouponRequest>,
    private readonly usersService: UsersService,
    private readonly couponsService: CouponsService,
  ) {}

  async create(createCouponRequestDto: CreateCouponRequestDto) {
    const { userId, couponId } = createCouponRequestDto;

    const user = await this.usersService.findOneById(userId);
    const coupon = await this.couponsService.findOne(couponId);

    const request = this.couponRequestRepository.create({
      user,
      coupon,
      role: 'Pending', // Default status
    });
    return await this.couponRequestRepository.save(request);
  }

  async findAll() {
    return await this.couponRequestRepository.find({
      relations: ['user', 'coupon'],
    });
  }

  async findByUserId(userId: number) {
    const requests = await this.couponRequestRepository.find({
      where: { user: { id: userId } },
      relations: ['coupon'],
    });
    return requests.map((request) => request.coupon);
  }

  async findByCouponId(couponId: number) {
    const requests = await this.couponRequestRepository.find({
      where: { coupon: { id: couponId } },
      relations: ['user'],
    });
    return requests.map((request) => request.user);
  }
}
