import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  pricePerNight: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  bedrooms: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  hostId: number;
}
