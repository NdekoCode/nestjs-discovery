import { Type } from 'class-transformer';
import {
    IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name must be at least 3 characters long',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsDate({
    message: 'Created at must be a valid date',
  })
  createdAt?: string;
}
