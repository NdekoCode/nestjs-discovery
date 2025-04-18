import { Type } from 'class-transformer';
import {
    IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    @Type(()=>Number)
    @Min(18)
    @Max(100)
    age:number;

    @IsEnum(['m','f'])
    @IsNotEmpty()
    gender:'m'|'f' | string

    @IsString()
    @IsOptional()
    about:string;

    @IsBoolean()
    @IsOptional()
    isActive:boolean;

    @IsString()
    @IsOptional()
    @IsUrl()
    imageUrl:string;
}
