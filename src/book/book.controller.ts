import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

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
    console.log(book)
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }
}
