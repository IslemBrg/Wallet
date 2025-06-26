import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { WalletSummary } from './dto/wallet-summary.dto';
import { PeriodAnalytics } from './dto/period-analytics.dto';
export declare class AnalyticsService {
    private readonly expenseService;
    private readonly incomeService;
    constructor(expenseService: ExpenseService, incomeService: IncomeService);
    getWalletSummary(startDate: Date, endDate: Date): Promise<WalletSummary>;
    getPeriodAnalytics(year: number, month?: number): Promise<PeriodAnalytics>;
    getMonthlyComparison(year: number): Promise<PeriodAnalytics[]>;
}
