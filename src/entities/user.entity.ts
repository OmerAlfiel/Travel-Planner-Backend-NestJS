// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './expense.entity';
import { Itinerary } from './itinerary.entity';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('simple-array')
  roles: string[];

  @Column('json', { nullable: true })
  preferences: Record<string, any>;
  
  @OneToMany(() => Expense, expense => expense.user) 
  expenses: Expense[]; 

  @OneToMany(() => Itinerary, itinerary => itinerary.user) 
  itineraries: Itinerary[]; 

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}