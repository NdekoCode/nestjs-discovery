import { FirstInterceptor } from 'src/interceptors/first/first.interceptor';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { BookService } from './book.service';
import AddBookDTO from './dto/add-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@UseInterceptors(FirstInterceptor)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async list() {
    return await this.bookService.getAllBooks();
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.getBook(id);
  }
  @Post()
  async addBook(@Body('title') book: AddBookDTO) {
    
    return await this.bookService.addBook(book);
  }

  @Put('/:id')
  async updateBook(
    @Param('id',ParseIntPipe) bookIndex: number,
    @Body('title') book: UpdateBookDto,
  ) {
    return this.bookService.updateBook(bookIndex,book);
  }

  @Delete('/:id')
  async deleteBook(@Param('id',ParseIntPipe) bookIndex: number) {
    return await this.bookService.deleteBook(bookIndex);
  }
}
