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
import { AuthorService } from '../service/author.service';
import { AuthorCreateDto } from '../dto/author-create.dto';
import { AuthorUpdateDto } from '../dto/author-update.dto';
import { ParseQueryParams } from 'src/app/pipe/parse-query-params';
import { AuthGuard } from 'src/app/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() authorCreateDto: AuthorCreateDto) {
    return this.authorService.create(authorCreateDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() authorUpdateDto: AuthorUpdateDto,
  ) {
    return this.authorService.update(id, authorUpdateDto);
  }

  @UsePipes(ParseQueryParams)
  @Get()
  async readAll(@Query() { take, skip }: { take: number; skip: number }) {
    return this.authorService.readAll(take, skip);
  }

  @Get(':id')
  async readOne(@Param('id') id: string) {
    return this.authorService.readOne({ id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authorService.delete({ id });
  }
}
