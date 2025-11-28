
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length, Min, min, MinLength } from 'class-validator';
export class CreateUserDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Length(3)
    @IsAlphanumeric()
    @IsNotEmpty()
    password: string;
}