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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("text", { array: true })
  nameFilter: string[];

  @ManyToOne(() => RealtyEntity, (realty) => realty.filters)
  @JoinColumn({ name: 'realtyId' })
  realty: RealtyEntity;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
