import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAllTodoDTO {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsBoolean()
    isDone:boolean;

    @IsDate()
    @IsOptional()
    createdAt:Date;

    @IsOptional()
    @IsDate()
    updatedAt:Date;
}