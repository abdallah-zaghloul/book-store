import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Author } from '../entity/author.entity';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }
}
