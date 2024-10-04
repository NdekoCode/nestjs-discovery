import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetPaginatedTodoDTO {
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Type(()=>Number)
    page:number;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    @Type(()=>Number)
    limit:number;
}