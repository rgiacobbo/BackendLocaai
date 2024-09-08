import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  city: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(256)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  phone: string;

  @ApiProperty()
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
