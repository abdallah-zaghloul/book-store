import {
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @MaxLength(191)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(191)
  @IsString()
  password: string;
}
