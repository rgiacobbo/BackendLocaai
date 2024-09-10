import { IsOptional } from 'class-validator';
import { RealtyEntity } from 'src/db/entities/realty.entity';

export class RatingDto {
  @IsOptional()
  id: string;
  realtyId: RealtyEntity;
  comment: string;
  grade: number;
  userId: string;
}

export interface Rating {}
