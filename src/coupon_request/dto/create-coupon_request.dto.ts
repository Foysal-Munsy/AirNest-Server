import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCouponRequestDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  couponId: number;
}
