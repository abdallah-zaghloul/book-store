import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from '../repository/book.repository';
import { Book } from '../entity/book.entity';
import { BookCreateDto } from '../dto/book-create.dto';
import { BookUpdateDto } from '../dto/book-update.dto';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create(bookCreateDto: BookCreateDto) {
    return this.bookRepository.createWithValidIds(
      bookCreateDto,
      new BadRequestException(),
    );
  }

  async update(id: string, bookUpdateDto: BookUpdateDto) {
    //check is existed id
    await this.readOne({ id });
    return this.bookRepository.save({ id, ...bookUpdateDto });
  }

  async readAll(take: number, skip: number, bookProps?: Partial<Book>) {
    return this.bookRepository.find({ take, skip, where: bookProps });
  }

  async readOne(bookProps: Partial<Book>) {
    const book = await this.bookRepository.findOne({ where: bookProps });
    if (!book) throw new NotFoundException();
    return book;
  }

  async delete(bookProps: Partial<Book>) {
    const { affected } = await this.bookRepository.delete(bookProps);
    if (affected === 0) throw new NotFoundException();
  }
}
