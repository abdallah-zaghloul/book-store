import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from '../repository/author.repository';
import { AuthorCreateDto } from '../dto/author-create.dto';
import { AuthorUpdateDto } from '../dto/author-update.dto';
import { Author } from '../entity/author.entity';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async create(authorCreateDto: AuthorCreateDto) {
    return this.authorRepository.save(authorCreateDto);
  }

  async update(id: string, authorUpdateDto: AuthorUpdateDto) {
    //check is existed id
    await this.readOne({ id });
    return this.authorRepository.save({ id, ...authorUpdateDto });
  }

  async readAll(take: number, skip: number, authorProps?: Partial<Author>) {
    return this.authorRepository.find({ take, skip, where: authorProps });
  }

  async readOne(authorProps: Partial<Author>) {
    const author = await this.authorRepository.findOne({ where: authorProps });
    if (!author) throw new NotFoundException();
    return author;
  }

  async delete(authorProps: Partial<Author>) {
    const { affected } = await this.authorRepository.delete(authorProps);
    if (affected === 0) throw new NotFoundException();
  }
}
