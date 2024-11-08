import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RealtyEntity } from './realty.entity';

@Entity({ name: 'tbfilter' })
export class FilterEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column("text", { array: true })
  nameFilter: string[];

  @ManyToOne(() => RealtyEntity, (realty) => realty.filters)
  @JoinColumn({ name: 'realtyId' })
  realty: RealtyEntity;
}
