import { Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import AddBookDTO from './dto/add-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}
  async getAllBooks() {
    return await this.bookRepository.find();
  }

  async getBook(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if(!book){
        throw new NotFoundException("Book not found")
    }
    return book;
  }
  async addBook(book: AddBookDTO) {
    const existingBook = await this.bookRepository.findOne({
      where: { name: book.name, author: book.author },
    });
    if (existingBook) {
      throw new ConflictException('Book already exist');
    }
    const newBook = this.bookRepository.create(book);
    return await this.bookRepository.save(newBook);
  }

  async updateBook(id: number, book: UpdateBookDto) {
    const existingBook = await this.getBook(id);
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    delete book?.id;
    const updatedBook = Object.assign(existingBook, book);
    return await this.bookRepository.save(updatedBook);
  }

  async deleteBook(id: number) {
    const existingBook = await this.getBook(id);
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    return await this.bookRepository.delete(id);
  }
}
