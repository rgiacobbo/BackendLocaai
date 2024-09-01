import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbrealty' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  value: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'varchar' })
  capacity: number;
}
