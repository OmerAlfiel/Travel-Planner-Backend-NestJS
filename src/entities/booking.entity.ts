// src/entities/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column()
  status: string;

  @Column('json')
  details: Record<string, any>;

  @ManyToOne(() => User)
  user: User;
  
}