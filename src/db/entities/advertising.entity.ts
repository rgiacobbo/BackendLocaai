import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RealtyEntity } from './realty.entity';

@Entity({ name: 'tbadvertising' })
export class AdvertisingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'date' })
  dateStart: Date;

  @Column({ type: 'date' })
  dateEnd: Date;

  @Column({ type: 'integer' })
  value: number;

  @ManyToOne(() => RealtyEntity, (realty) => realty.ratings)
  @JoinColumn({ name: 'realtyId' })
  realtyId: RealtyEntity;
}
