import { Type } from 'class-transformer';
import {
    IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, Max, Min
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/;
export class CreateUserDto {
  @IsOptional()
  @Type(() => Number)
  id: number;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @IsInt()
  @Type(() => Number)
  @Min(18)
  @Max(100)
  age: number;

  @IsEnum(['m', 'f'])
  @IsNotEmpty()
  gender: 'm' | 'f' | string;

  @IsString()
  @IsOptional()
  about: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsString()
  @IsOptional()
  @IsUrl()
  imageUrl: string;
}
