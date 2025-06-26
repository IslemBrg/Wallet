import { ObjectType, Field, Int } from '@nestjs/graphql';
import { WalletSummary } from './wallet-summary.dto';
import { DatePeriod } from './date-period.dto';

@ObjectType()
export class PeriodAnalytics {
  @Field(() => Int)
  year: number;

  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => WalletSummary)
  summary: WalletSummary;

  @Field(() => DatePeriod)
  period: DatePeriod;
}