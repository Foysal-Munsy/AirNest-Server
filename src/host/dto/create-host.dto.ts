import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateHostDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsInt()
  @Min(0)
  age: number;
}
