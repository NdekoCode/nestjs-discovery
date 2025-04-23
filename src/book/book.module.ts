import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';

@Module({
    imports:[TypeOrmModule.forFeature([BookEntity])],
    exports:[],
    providers:[BookService],
    controllers:[BookController]
})

export class BookModule {

}