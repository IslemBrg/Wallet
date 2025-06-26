import { Injectable } from '@nestjs/common';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { WalletSummary } from './dto/wallet-summary.dto';
import { PeriodAnalytics } from './dto/period-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly incomeService: IncomeService,
  ) {}

  async getWalletSummary(startDate: Date, endDate: Date): Promise<WalletSummary> {
    const [totalExpenses, totalIncomes] = await Promise.all([
      this.expenseService.getTotalByPeriod(startDate, endDate),
      this.incomeService.getTotalByPeriod(startDate, endDate),
    ]);

    const netAmount = totalIncomes - totalExpenses;
    const savingsRate = totalIncomes > 0 ? ((netAmount / totalIncomes) * 100) : 0;

    return {
      totalExpenses,
      totalIncomes,
      netAmount,
      savingsRate,
      period: {
        startDate,
        endDate,
      },
    };
  }

  async getPeriodAnalytics(year: number, month?: number): Promise<PeriodAnalytics> {
    let startDate: Date;
    let endDate: Date;

    if (month) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    }

    const summary = await this.getWalletSummary(startDate, endDate);

    return {
      year,
      month,
      summary,
      period: {
        startDate,
        endDate,
      },
    };
  }

  async getMonthlyComparison(year: number): Promise<PeriodAnalytics[]> {
    const monthlyData: PeriodAnalytics[] = [];

    for (let month = 1; month <= 12; month++) {
      const analytics = await this.getPeriodAnalytics(year, month);
      monthlyData.push(analytics);
    }

    return monthlyData;
  }
}