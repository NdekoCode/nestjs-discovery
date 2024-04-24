import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

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

    console.log(bookIndex, this.books);
    return newValue;
  }
}
