import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    @Min(8)
    password:string;

}