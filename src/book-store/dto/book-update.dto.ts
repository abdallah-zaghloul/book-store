import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmptyClass } from 'src/app/decorator/is-not-empty-class';
import { BookCreateDto } from './book-create.dto';

@IsNotEmptyClass()
export class BookUpdateDto extends PartialType(BookCreateDto) {}
