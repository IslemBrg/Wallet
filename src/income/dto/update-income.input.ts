import { CreateIncomeInput } from './create-income.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateIncomeInput extends PartialType(CreateIncomeInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}