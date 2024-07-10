import { PartialType } from '@nestjs/mapped-types';
import { AuthorCreateDto } from './author-create.dto';
import { IsNotEmptyClass } from 'src/app/decorator/is-not-empty-class';

@IsNotEmptyClass()
export class AuthorUpdateDto extends PartialType(AuthorCreateDto) {}
