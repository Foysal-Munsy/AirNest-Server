import { Module } from '@nestjs/common';
import { CouponRequestService } from './coupon_request.service';
import { CouponRequestController } from './coupon_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponRequest } from './entities/coupon_request.entity';
import { UsersModule } from 'src/users/users.module';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponRequest]),
    UsersModule,
    CouponsModule,
  ],
  controllers: [CouponRequestController],
  providers: [CouponRequestService],
  exports: [CouponRequestService],
})
export class CouponRequestModule {}
