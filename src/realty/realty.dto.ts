import { IsOptional } from 'class-validator';
import { UserEntity } from 'src/db/entities/user.entity';

export class RealtyDto {
  @IsOptional()
  id: string;
  userId: UserEntity;
  title: string;
  value: number;
  description: string;
  date: string;
  capacity: number;
  latitude: string;
  longitude: string;
}

export interface Realty {}
