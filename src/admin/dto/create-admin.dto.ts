import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Length(4, 100)
  username: string;

  @IsString()
  @Length(4, 150)
  fullname: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
