import { IsOptional } from 'class-validator';
import { UserEntity } from 'src/db/entities/user.entity';

export class RealtyDto {
  @IsOptional()
  id: string;
  userId: UserEntity;
  title: string;
  value: number;
  description: string;
  category: string;
  adress: string;
  no: number;
  city: string;
  state: string;
  cep: string;
  room: number;
  bathroom: number;
  garage: number;
  area: number
  nameFilter: string[];
  latitude: string;
  longitude: string;
}

export interface Realty {}
