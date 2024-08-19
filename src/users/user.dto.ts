import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;
  email: string;
  city: string;

  @IsString()
  @MinLength(6)
  @MaxLength(256)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(14)
  phone: string;

  @IsString()
  @MinLength(10)
  @MaxLength(12)
  cpf: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  phone: string;
  email: string;
  cpf: string;
  city: string;
}
