import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  address?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  pricePerNight?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  bedrooms?: number;
}
