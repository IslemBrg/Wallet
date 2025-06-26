import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { ExpenseFiltersInput } from './dto/expense-filters.input';
export declare class ExpenseResolver {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    createExpense(createExpenseInput: CreateExpenseInput): Promise<Expense>;
    findAll(filters?: ExpenseFiltersInput): Promise<Expense[]>;
    findOne(id: string): Promise<Expense>;
    updateExpense(updateExpenseInput: UpdateExpenseInput): Promise<Expense>;
    removeExpense(id: string): Promise<boolean>;
    getTotalByPeriod(startDate: Date, endDate: Date): Promise<number>;
    getTotalByCategory(categoryId: string, startDate?: Date, endDate?: Date): Promise<number>;
}
