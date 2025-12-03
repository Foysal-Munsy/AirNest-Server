import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class CreateAdminDto {
  @IsNotEmpty({ message: 'You must write an username' })
  @IsString()
  @Length(4, 100)
  username: string;

  @IsNotEmpty({ message: 'Write your full name' })
  @IsString()
  @Length(4, 150)
  fullname: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
