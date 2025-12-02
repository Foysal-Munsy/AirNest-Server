import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  guestName: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalPrice: number;
}
