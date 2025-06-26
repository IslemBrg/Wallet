import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';
import { WalletSummary } from './dto/wallet-summary.dto';
import { PeriodAnalytics } from './dto/period-analytics.dto';

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => WalletSummary, { name: 'walletSummary' })
  getWalletSummary(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.analyticsService.getWalletSummary(startDate, endDate);
  }

  @Query(() => PeriodAnalytics, { name: 'periodAnalytics' })
  getPeriodAnalytics(
    @Args('year', { type: () => Int }) year: number,
    @Args('month', { type: () => Int, nullable: true }) month?: number,
  ) {
    return this.analyticsService.getPeriodAnalytics(year, month);
  }

  @Query(() => [PeriodAnalytics], { name: 'monthlyComparison' })
  getMonthlyComparison(@Args('year', { type: () => Int }) year: number) {
    return this.analyticsService.getMonthlyComparison(year);
  }
}