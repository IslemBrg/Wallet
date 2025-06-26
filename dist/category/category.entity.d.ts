import { Expense } from '../expense/expense.entity';
import { Income } from '../income/income.entity';
export declare class Category {
    id: string;
    name: string;
    description?: string;
    color: string;
    type: 'expense' | 'income' | 'both';
    expenses?: Expense[];
    incomes?: Income[];
    createdAt: Date;
    updatedAt: Date;
}
