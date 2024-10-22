import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'tblocation' })
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'date' })
  dateStart: Date;

  @Column({ type: 'date' })
  dateEnd: Date;

  //   @ManyToOne(() => RealtyEntity, (realty) => realty.ratings)
  //   @JoinColumn({ name: 'realtyId' })
  //   realtyId: RealtyEntity;

  @ManyToOne(() => UserEntity, (user) => user.locations)
  @JoinColumn({ name: 'userLocation' })
  userLessor: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.tenants)
  @JoinColumn({ name: 'userTenant' })
  userTenant: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
