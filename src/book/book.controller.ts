import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('books')
export class BookController {
  books: string[] = [];
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
}
