import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RealtyEntity } from './realty.entity';
import { LocationEntity } from './location.entity';

@Entity({ name: 'tbuser' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  cpf: string;


  // esse aqui é o campo de "sobre o usuário" na tela do perfil
  @Column({ type: 'varchar', length: 350, nullable: true})
  about: string;

  /* @Column({ type: 'varchar', nullable: true })
  filterUser: string; */

  @OneToMany(() => RealtyEntity, (realty) => realty.userId)
  realtys: RealtyEntity[];

  @OneToMany(() => LocationEntity, (location) => location.userLessor)
  locations: LocationEntity[];

  @OneToMany(() => LocationEntity, (location) => location.userTenant)
  tenants: LocationEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
