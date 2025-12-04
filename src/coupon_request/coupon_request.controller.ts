import { Body, Controller, Get, Post } from '@nestjs/common';
import { CouponRequestService } from './coupon_request.service';
import { CreateCouponRequestDto } from './dto/create-coupon_request.dto';

@Controller('coupon-request')
export class CouponRequestController {
  constructor(private readonly couponRequestService: CouponRequestService) {}

  @Post('create')
  create(@Body() createCouponRequestDto: CreateCouponRequestDto) {
    return this.couponRequestService.create(createCouponRequestDto);
  }

  @Get('all')
  findAll() {
    return this.couponRequestService.findAll();
  }
}
