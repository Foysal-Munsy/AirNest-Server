import { IsString, IsEmail, IsOptional} from 'class-validator'; 
 import { IsNumberString } from 'class-validator'; 

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    number?: string;

    @IsOptional()
    @IsString()
    profilepic?: string;

    @IsOptional()
    @IsNumberString()
    pdfdocument?: string;
}