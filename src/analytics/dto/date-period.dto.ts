import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DatePeriod {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}