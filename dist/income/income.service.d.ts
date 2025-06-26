import { Repository } from 'typeorm';
import { Income } from './income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { IncomeFiltersInput } from './dto/income-filters.input';
export declare class IncomeService {
    private incomeRepository;
    constructor(incomeRepository: Repository<Income>);
    create(createIncomeInput: CreateIncomeInput): Promise<Income>;
    findAll(filters?: IncomeFiltersInput): Promise<Income[]>;
    findOne(id: string): Promise<Income>;
    update(id: string, updateIncomeInput: UpdateIncomeInput): Promise<Income>;
    remove(id: string): Promise<boolean>;
    getTotalByPeriod(startDate: Date, endDate: Date): Promise<number>;
    getTotalByCategory(categoryId: string, startDate?: Date, endDate?: Date): Promise<number>;
}
