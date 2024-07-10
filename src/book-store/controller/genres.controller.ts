import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ParseQueryParams } from 'src/app/pipe/parse-query-params';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { GenreService } from '../service/genre.service';
import { GenreUpsertDto } from '../dto/genre-upsert.dto';

@UseGuards(AuthGuard)
@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() genreUpsertDto: GenreUpsertDto) {
    return this.genreService.create(genreUpsertDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() genreUpsertDto: GenreUpsertDto,
  ) {
    return this.genreService.update(id, genreUpsertDto);
  }

  @UsePipes(ParseQueryParams)
  @Get()
  async readAll(@Query() { take, skip }: { take: number; skip: number }) {
    return this.genreService.readAll(take, skip);
  }

  @Get(':id')
  async readOne(@Param('id') id: string) {
    return this.genreService.readOne({ id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.genreService.delete({ id });
  }
}
