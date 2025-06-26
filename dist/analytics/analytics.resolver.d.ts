import { AnalyticsService } from './analytics.service';
import { WalletSummary } from './dto/wallet-summary.dto';
import { PeriodAnalytics } from './dto/period-analytics.dto';
export declare class AnalyticsResolver {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getWalletSummary(startDate: Date, endDate: Date): Promise<WalletSummary>;
    getPeriodAnalytics(year: number, month?: number): Promise<PeriodAnalytics>;
    getMonthlyComparison(year: number): Promise<PeriodAnalytics[]>;
}
