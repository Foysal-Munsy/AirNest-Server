import { IsNotEmpty, Length } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  @Length(3, 20)
  code: string;

  @IsNotEmpty()
  discount: number;
}
