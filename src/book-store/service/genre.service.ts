import { Injectable, NotFoundException } from '@nestjs/common';
import { GenreRepository } from '../repository/genre.repository';
import { GenreUpsertDto } from '../dto/genre-upsert.dto';
import { Genre } from '../entity/genre.entity';

@Injectable()
export class GenreService {
  constructor(private genreRepository: GenreRepository) {}

  async create(genreUpsertDto: GenreUpsertDto) {
    return this.genreRepository.save(genreUpsertDto);
  }

  async update(id: string, genreUpsertDto: GenreUpsertDto) {
    //check is existed id
    await this.readOne({ id });
    return this.genreRepository.save({ id, ...genreUpsertDto });
  }

  async readAll(take: number, skip: number, genreProps?: Partial<Genre>) {
    return this.genreRepository.find({ take, skip, where: genreProps });
  }

  async readOne(genreProps: Partial<Genre>) {
    const genre = await this.genreRepository.findOne({ where: genreProps });
    if (!genre) throw new NotFoundException();
    return genre;
  }

  async delete(genreProps: Partial<Genre>) {
    const { affected } = await this.genreRepository.delete(genreProps);
    if (affected === 0) throw new NotFoundException();
  }
}
