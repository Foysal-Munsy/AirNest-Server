import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateHostProfileDto {
  @IsOptional()
  @IsString()
  @Matches(/^[0-9+-]{7,15}$/, { message: 'phone must be digits, + or -' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;
}
