import {
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty()
  @MaxLength(191)
  @IsString()
  fullName: string;

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
