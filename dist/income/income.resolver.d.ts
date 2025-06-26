import { IncomeService } from './income.service';
import { Income } from './income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { IncomeFiltersInput } from './dto/income-filters.input';
export declare class IncomeResolver {
    private readonly incomeService;
    constructor(incomeService: IncomeService);
    createIncome(createIncomeInput: CreateIncomeInput): Promise<Income>;
    findAll(filters?: IncomeFiltersInput): Promise<Income[]>;
    findOne(id: string): Promise<Income>;
    updateIncome(updateIncomeInput: UpdateIncomeInput): Promise<Income>;
    removeIncome(id: string): Promise<boolean>;
    getTotalByPeriod(startDate: Date, endDate: Date): Promise<number>;
    getTotalByCategory(categoryId: string, startDate?: Date, endDate?: Date): Promise<number>;
}
