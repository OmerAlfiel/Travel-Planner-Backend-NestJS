import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(expenseData: Partial<Expense>): Promise<Expense> {
    const expense = this.expenseRepository.create(expenseData);
    return this.expenseRepository.save(expense);
  }

  async update(id: number, updateData: Partial<Expense>): Promise<Expense> {
    await this.expenseRepository.update(id, updateData);
    const updatedExpense = await this.findById(id);
    if (!updatedExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return updatedExpense;
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async findById(id: number): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async categorizeExpenses(userId: number): Promise<any> {
    const expenses = await this.expenseRepository.find({ where: { userId } });
    if (!expenses.length) {
      throw new NotFoundException(`No expenses found for user with ID ${userId}`);
    }
    // Implement simple categorization logic
    const categorizedExpenses = expenses.reduce((acc, expense) => {
      acc[expense.category] = acc[expense.category] || [];
      acc[expense.category].push(expense);
      return acc;
    }, {});
    return categorizedExpenses;
  }
}
