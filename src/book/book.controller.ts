import { FirstInterceptor } from 'src/interceptors/first/first.interceptor';

import {
  Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseInterceptors
} from '@nestjs/common';

@UseInterceptors(FirstInterceptor)
@Controller('books')
export class BookController {
  books: string[] = ['Les 48 lois du pouvoir'];
  @Get()
  list() {
    return this.books;
  }

  @Get('/:id')
  getById(@Param('id') id: number): string {
    const book = this.books[id];
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }
  @Post()
  addBook(@Body('title') book: string): string {
    this.books.push(book);
    return book;
  }

  @Put('/:id')
  updateBook(
    @Param('id') bookIndex: string,
    @Body('title') newValue: string,
  ): string {
    const findBook = this.books[bookIndex];
    if (!findBook) {
      throw new NotFoundException();
    }

    this.books[+bookIndex] = newValue;
    return newValue;
  }

  @Delete('/:id')
  deleteBook(@Param('id') bookIndex: string) {
    console.log(this.books);
    const findBook = this.books[+bookIndex];
    if (!findBook) {
      throw new NotFoundException();
    }
    this.books.splice(+bookIndex, 1);
  }
}
