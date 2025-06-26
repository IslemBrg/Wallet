import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsUUID, IsOptional, IsDateString, Min } from 'class-validator';

@InputType()
export class CreateIncomeInput {
  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsDateString()
  date: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  notes?: string;

  @Field()
  @IsUUID()
  categoryId: string;
}