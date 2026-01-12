/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.couponRequestService.findByUserId(+userId);
  }

  @Get('coupon/:couponId')
  findByCouponId(@Param('couponId') couponId: string) {
    return this.couponRequestService.findByCouponId(+couponId);
  }
}
