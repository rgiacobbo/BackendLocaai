import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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
}
