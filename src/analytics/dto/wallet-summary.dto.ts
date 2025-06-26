import { ObjectType, Field, Float } from '@nestjs/graphql';
import { DatePeriod } from './date-period.dto';

@ObjectType()
export class WalletSummary {
  @Field(() => Float)
  totalExpenses: number;

  @Field(() => Float)
  totalIncomes: number;

  @Field(() => Float)
  netAmount: number;

  @Field(() => Float)
  savingsRate: number;

  @Field(() => DatePeriod)
  period: DatePeriod;
}