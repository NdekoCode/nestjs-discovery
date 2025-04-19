import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class AddTodoDTO{
    @IsNotEmpty()
    @MinLength(3)
    title:string;

    @IsString()    
    @IsOptional()
    description:string;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    isDone:boolean;

    @IsNotEmpty()
    @IsDate()
    @IsOptional()
    createdAt:Date;

    @IsNotEmpty()
    @IsDate()
    @IsOptional()
    updatedAt:Date;
}