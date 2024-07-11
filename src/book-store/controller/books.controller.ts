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
import { BookService } from '../service/book.service';
import { BookCreateDto } from '../dto/book-create.dto';
import { BookUpdateDto } from '../dto/book-update.dto';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ParseQueryParams } from 'src/app/pipe/parse-query-params';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() bookCreateDto: BookCreateDto) {
    return this.bookService.create(bookCreateDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bookUpdateDto: BookUpdateDto) {
    return this.bookService.update(id, bookUpdateDto);
  }

  @UsePipes(ParseQueryParams)
  @Get()
  async readAll(@Query() { take, skip }: { take: number; skip: number }) {
    return this.bookService.readAll(take, skip);
  }

  @Get(':id')
  async readOne(@Param('id') id: string) {
    return this.bookService.readOne({ id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete({ id });
  }
}
