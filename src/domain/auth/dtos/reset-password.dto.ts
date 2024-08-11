import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsJWT,
} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsJWT()
  token: string;
}
