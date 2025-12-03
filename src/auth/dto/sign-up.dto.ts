import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Enter an username' })
  @IsString()
  @Length(4, 100)
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Enter your full name' })
  @IsString()
  @Length(4, 150)
  fullname: string;

  @IsNotEmpty({ message: 'Enter a valid password' })
  @IsString()
  @Length(6, 10)
  password: string;
}
