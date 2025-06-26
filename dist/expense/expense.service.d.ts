import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { ExpenseFiltersInput } from './dto/expense-filters.input';
export declare class ExpenseService {
    private expenseRepository;
    constructor(expenseRepository: Repository<Expense>);
    create(createExpenseInput: CreateExpenseInput): Promise<Expense>;
    findAll(filters?: ExpenseFiltersInput): Promise<Expense[]>;
    findOne(id: string): Promise<Expense>;
    update(id: string, updateExpenseInput: UpdateExpenseInput): Promise<Expense>;
    remove(id: string): Promise<boolean>;
    getTotalByPeriod(startDate: Date, endDate: Date): Promise<number>;
    getTotalByCategory(categoryId: string, startDate?: Date, endDate?: Date): Promise<number>;
}
