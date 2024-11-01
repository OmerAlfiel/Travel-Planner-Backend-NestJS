// src/entities/destination.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PointOfInterest } from './point-of-interest.entity';
import { Itinerary } from './itinerary.entity';
import { Review } from './review.entity';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => PointOfInterest, poi => poi.destination)
  pointsOfInterest: PointOfInterest[];

  @Column('text')
  summary: string;

  @OneToMany(() => Itinerary, itinerary => itinerary.destination) 
  itineraries: Itinerary[]; 

  @OneToMany(() => Review, (review) => review.destination)
  reviews: Review[]; 
}