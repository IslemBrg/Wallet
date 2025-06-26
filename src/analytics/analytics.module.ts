import { Module } from '@nestjs/common';
import { ExpenseModule } from '../expense/expense.module';
import { IncomeModule } from '../income/income.module';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';

@Module({
  imports: [ExpenseModule, IncomeModule],
  providers: [AnalyticsService, AnalyticsResolver],
})
export class AnalyticsModule {}