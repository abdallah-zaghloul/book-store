import {
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from 'class-validator';

export class AuthorCreateDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(191)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  biography: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;
}
