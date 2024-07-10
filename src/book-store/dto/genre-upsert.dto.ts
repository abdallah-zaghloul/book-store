import { IsString, MaxLength, IsNotEmpty, MinLength } from 'class-validator';

export class GenreUpsertDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(191)
  @IsString()
  name: string;
}
