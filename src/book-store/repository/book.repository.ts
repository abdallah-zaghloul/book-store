import { DataSource, Repository } from 'typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Book } from '../entity/book.entity';
import { AuthorRepository } from './author.repository';
import { GenreRepository } from './genre.repository';
import { BookCreateDto } from '../dto/book-create.dto';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(
    private dataSource: DataSource,
    private authorRepository: AuthorRepository,
    private genreRepository: GenreRepository,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  async createWithValidIds(book: BookCreateDto, exception: HttpException) {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    const genre = await this.genreRepository.findOne({
      where: { id: book.genreId },
    });

    if (!(author && genre)) throw exception;
    const bookEntity = this.create({ ...book, author, genre });
    return this.save(bookEntity);
  }
}
