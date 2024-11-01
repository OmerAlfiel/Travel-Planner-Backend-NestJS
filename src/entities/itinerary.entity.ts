import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Destination } from './destination.entity';

@Entity()
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Destination, (destination) => destination.itineraries)
  destination: Destination;

  @Column('simple-array')
  activities: string[];

  @ManyToOne(() => User, (user) => user.itineraries)
  user: User;
}
