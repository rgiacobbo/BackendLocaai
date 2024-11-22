import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RatingEntity } from './rating.entity';
import { FilterEntity } from './filter.entity';

@Entity({ name: 'tbrealty' })
export class RealtyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  category: string;

  @Column({ type: 'varchar', length: 255 })
  adress: string;

  @Column({ type: 'integer' })
  no: number;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  cep: string;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @Column({ type: 'integer' })
  room: number;

  @Column({ type: 'integer' })
  bathroom: number;

  @Column({ type: 'integer' })
  garage: number;

  @Column({ type: 'integer' })
  area: number;

  @Column('text', { array: true })
  nameFilter: string[];

  @Column({ type: 'varchar', length: 255 })
  latitude: string;

  @Column({ type: 'varchar', length: 255 })
  longitude: string;

  @ManyToOne(() => UserEntity, (user) => user.realtys)
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.realtyId)
  ratings: RatingEntity[];

  @OneToMany(() => FilterEntity, (filter) => filter.realty)
  filters: FilterEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
