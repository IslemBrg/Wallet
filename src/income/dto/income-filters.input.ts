import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsOptional, IsDateString, IsString, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class IncomeFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  minAmount?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  maxAmount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}