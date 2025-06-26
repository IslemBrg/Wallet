import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsHexColor, IsEnum } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ defaultValue: '#3B82F6' })
  @IsHexColor()
  @IsOptional()
  color?: string;

  @Field({ defaultValue: 'both' })
  @IsEnum(['expense', 'income', 'both'])
  @IsOptional()
  type?: 'expense' | 'income' | 'both';
}