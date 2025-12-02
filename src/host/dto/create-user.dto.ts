import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'no special characters allowed' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^\s@]+@aiub\.edu$/i, {
    message: 'email must be in the aiub.edu domain',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'minimum 6 characters long' })
  @Matches(/(?=.*[A-Z]).+/, { message: 'at least one uppercase letter' })
  password: string;

  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'phone must contain digits only' })
  number: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
