import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { ExpenseFiltersInput } from './dto/expense-filters.input';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseInput: CreateExpenseInput): Promise<Expense> {
    const expense = this.expenseRepository.create(createExpenseInput);
    return this.expenseRepository.save(expense);
  }

  async findAll(filters?: ExpenseFiltersInput): Promise<Expense[]> {
    const query = this.expenseRepository.createQueryBuilder('expense')
      .leftJoinAndSelect('expense.category', 'category')
      .orderBy('expense.date', 'DESC');

    if (filters) {
      if (filters.startDate && filters.endDate) {
        query.andWhere('expense.date BETWEEN :startDate AND :endDate', {
          startDate: filters.startDate,
          endDate: filters.endDate,
        });
      }

      if (filters.categoryId) {
        query.andWhere('expense.categoryId = :categoryId', {
          categoryId: filters.categoryId,
        });
      }

      if (filters.minAmount !== undefined) {
        query.andWhere('expense.amount >= :minAmount', {
          minAmount: filters.minAmount,
        });
      }

      if (filters.maxAmount !== undefined) {
        query.andWhere('expense.amount <= :maxAmount', {
          maxAmount: filters.maxAmount,
        });
      }

      if (filters.description) {
        query.andWhere('expense.description ILIKE :description', {
          description: `%${filters.description}%`,
        });
      }
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    
    return expense;
  }

  async update(id: string, updateExpenseInput: UpdateExpenseInput): Promise<Expense> {
    await this.expenseRepository.update(id, updateExpenseInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.expenseRepository.delete(id);
    return result.affected > 0;
  }

  async getTotalByPeriod(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async getTotalByCategory(categoryId: string, startDate?: Date, endDate?: Date): Promise<number> {
    const query = this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.categoryId = :categoryId', { categoryId });

    if (startDate && endDate) {
      query.andWhere('expense.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const result = await query.getRawOne();
    return parseFloat(result.total) || 0;
  }
}