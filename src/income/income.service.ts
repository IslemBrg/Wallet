import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { IncomeFiltersInput } from './dto/income-filters.input';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  async create(createIncomeInput: CreateIncomeInput): Promise<Income> {
    const income = this.incomeRepository.create(createIncomeInput);
    return this.incomeRepository.save(income);
  }

  async findAll(filters?: IncomeFiltersInput): Promise<Income[]> {
    const query = this.incomeRepository.createQueryBuilder('income')
      .leftJoinAndSelect('income.category', 'category')
      .orderBy('income.date', 'DESC');

    if (filters) {
      if (filters.startDate && filters.endDate) {
        query.andWhere('income.date BETWEEN :startDate AND :endDate', {
          startDate: filters.startDate,
          endDate: filters.endDate,
        });
      }

      if (filters.categoryId) {
        query.andWhere('income.categoryId = :categoryId', {
          categoryId: filters.categoryId,
        });
      }

      if (filters.minAmount !== undefined) {
        query.andWhere('income.amount >= :minAmount', {
          minAmount: filters.minAmount,
        });
      }

      if (filters.maxAmount !== undefined) {
        query.andWhere('income.amount <= :maxAmount', {
          maxAmount: filters.maxAmount,
        });
      }

      if (filters.description) {
        query.andWhere('income.description ILIKE :description', {
          description: `%${filters.description}%`,
        });
      }
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Income> {
    const income = await this.incomeRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    
    if (!income) {
      throw new NotFoundException(`Income with ID ${id} not found`);
    }
    
    return income;
  }

  async update(id: string, updateIncomeInput: UpdateIncomeInput): Promise<Income> {
    await this.incomeRepository.update(id, updateIncomeInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.incomeRepository.delete(id);
    return result.affected > 0;
  }

  async getTotalByPeriod(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.incomeRepository
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'total')
      .where('income.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async getTotalByCategory(categoryId: string, startDate?: Date, endDate?: Date): Promise<number> {
    const query = this.incomeRepository
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'total')
      .where('income.categoryId = :categoryId', { categoryId });

    if (startDate && endDate) {
      query.andWhere('income.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const result = await query.getRawOne();
    return parseFloat(result.total) || 0;
  }
}