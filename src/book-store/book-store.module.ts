import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entity/author.entity';
import { AuthorsController } from './controller/authors.controller';
import { AuthorService } from './service/author.service';
import { AuthorRepository } from './repository/author.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorService, AuthorRepository],
})
export class BookStoreModule {}
