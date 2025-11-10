/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name contain only alphabet' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @Matches(/\.xyz$/)
  email: string;
  role: string; // host or guest

  @IsNotEmpty({ message: 'NID number is required' })
  @Matches(/^\d{10}$/, { message: 'NID must be 10 digits' })
  nidNumber: string;

  @IsOptional()
  nidImage?: Express.Multer.File;
}
