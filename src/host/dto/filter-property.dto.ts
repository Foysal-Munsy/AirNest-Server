import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PropertySort {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  DATE_ADDED = 'date_added',
}

export class FilterPropertyDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  minPrice?: string;

  @IsOptional()
  @IsEnum(PropertySort)
  sort?: PropertySort;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
