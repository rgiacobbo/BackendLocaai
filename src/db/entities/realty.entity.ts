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

  @Column({ type: 'integer' })
  value: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  date: string;

  @Column({ type: 'integer' })
  capacity: number;

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

  @Column({ type: 'varchar', length: 255 })
  latitude: string;

  @Column({ type: 'varchar', length: 255 })
  longitude: string;
}
