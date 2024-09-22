import { RealtyEntity } from 'src/db/entities/realty.entity';

export class AdvertisingDto {
  id: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  value: number;
  idRealty: RealtyEntity;
}
