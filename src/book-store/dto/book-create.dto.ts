import {
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(191)
  @IsString()
  title: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  publicationDate: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @IsNotEmpty()
  @IsUUID()
  genreId: string;
}
