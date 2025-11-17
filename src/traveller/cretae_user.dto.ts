import { IsEmail, IsNotEmpty, IsString, MATCHES, Matches, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty({message:'please fill up'})
    @Matches(/^[a-zA-Z0-9]+$/,{message:'no special characters allowed'})
    name : string;
    @IsEmail()
    email?: string;
   
    @MinLength(6,{message:'minimum 6 characters long'})
    @Matches(/(?=.*[a-z])/,{message:'at least one uppercase letter'})
     @IsNotEmpty({message:'password can not be empty'})
    password: string;
    @IsString()
    @IsNotEmpty()
    @Matches(/^01[0-9]{9}$/,{message:"invalid number"})
    number: string;
    @IsString()
    profilepic?:string;
}