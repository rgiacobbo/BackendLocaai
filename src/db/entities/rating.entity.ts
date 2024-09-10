import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RealtyEntity } from './realty.entity';

@Entity({ name: 'tbrating' })
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column({ type: 'integer' })
  grade: number;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @ManyToOne(() => RealtyEntity, (realty) => realty.ratings)
  @JoinColumn({ name: 'realtyId' })
  realtyId: RealtyEntity;
}
