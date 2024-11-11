import { IsString, MaxLength, MinLength,IsOptional, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/db/entities/user.entity';

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


  // esse aqui é o campo de "sobre o usuário" na tela do perfil
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(350)
  about?: string;


  /*@ApiProperty()
  @IsOptional()
  @IsString()
  filterUser?: string; */

  locations: UserEntity;
  tenants: UserEntity;
}

export interface User {
  id: string;
  name: string;
  password: string;
  phone: string;
  email: string;
  cpf: string;
  city: string;
  about: string;
  //filterUser: string;
  locations: UserEntity;
  tenants: UserEntity;
}
