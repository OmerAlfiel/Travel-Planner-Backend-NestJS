import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../entities/expense.entity';
import { CreateExpenseDto } from '../dto/create-expense.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() expenseData: CreateExpenseDto): Promise<Expense> {
    return this.expenseService.create(expenseData);
  }

  @Get(':userId')
  async getByUserId(@Param('userId') userId: number): Promise<Expense[]> {
    const expenses = await this.expenseService.categorizeExpenses(userId);
    if (!expenses) {
      throw new NotFoundException(`No expenses found for user with ID ${userId}`);
    }
    return expenses;
  }
}
