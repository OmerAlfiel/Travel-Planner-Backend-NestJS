import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => User, user => user.expenses)
  user: User; // Assuming you have a relation set up in the User entity

  @Column()
  userId: number;
}
