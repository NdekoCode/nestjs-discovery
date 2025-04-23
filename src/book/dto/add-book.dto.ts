import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class AddBookDTO {
    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    id?:number;
    @IsNotEmpty()
    @IsString()
     name?:string;

     @IsString()
     @IsNotEmpty()
     author:string;

     @IsString()
     @IsNotEmpty()
     description:string;
}