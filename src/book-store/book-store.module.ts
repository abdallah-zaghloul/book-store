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
@Module({
  imports: [TypeOrmModule.forFeature([Author, Genre])],
  controllers: [AuthorsController, GenresController],
  providers: [AuthorService, AuthorRepository, GenreService, GenreRepository],
})
export class BookStoreModule {}
