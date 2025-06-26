import { WalletSummary } from './wallet-summary.dto';
import { DatePeriod } from './date-period.dto';
export declare class PeriodAnalytics {
    year: number;
    month?: number;
    summary: WalletSummary;
    period: DatePeriod;
}
