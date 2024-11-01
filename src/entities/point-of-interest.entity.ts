// src/entities/point-of-interest.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Destination } from './destination.entity';

@Entity()
export class PointOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @ManyToOne(() => Destination, (destination) => destination.pointsOfInterest)
  destination: Destination;
}
