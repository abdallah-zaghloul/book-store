import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entity/author.entity';
import { AuthorsController } from './controller/authors.controller';
import { GenresController } from './controller/genres.controller';
import { AuthorService } from './service/author.service';
import { AuthorRepository } from './repository/author.repository';
import { Genre } from './entity/genre.entity';
import { GenreService } from './service/genre.service';
import { GenreRepository } from './repository/genre.repository';
import { BookService } from './service/book.service';
import { BookRepository } from './repository/book.repository';
import { BooksController } from './controller/books.controller';
import { Book } from './entity/book.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Author, Genre, Book])],
  controllers: [AuthorsController, GenresController, BooksController],
  providers: [
    AuthorService,
    AuthorRepository,
    GenreService,
    GenreRepository,
    BookService,
    BookRepository,
  ],
})
export class BookStoreModule {}
