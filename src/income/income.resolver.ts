import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { IncomeService } from './income.service';
import { Income } from './income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { IncomeFiltersInput } from './dto/income-filters.input';

@Resolver(() => Income)
export class IncomeResolver {
  constructor(private readonly incomeService: IncomeService) {}

  @Mutation(() => Income)
  createIncome(@Args('createIncomeInput') createIncomeInput: CreateIncomeInput) {
    return this.incomeService.create(createIncomeInput);
  }

  @Query(() => [Income], { name: 'incomes' })
  findAll(@Args('filters', { nullable: true }) filters?: IncomeFiltersInput) {
    return this.incomeService.findAll(filters);
  }

  @Query(() => Income, { name: 'income' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.incomeService.findOne(id);
  }

  @Mutation(() => Income)
  updateIncome(@Args('updateIncomeInput') updateIncomeInput: UpdateIncomeInput) {
    return this.incomeService.update(updateIncomeInput.id, updateIncomeInput);
  }

  @Mutation(() => Boolean)
  removeIncome(@Args('id', { type: () => ID }) id: string) {
    return this.incomeService.remove(id);
  }

  @Query(() => Float, { name: 'totalIncomesByPeriod' })
  getTotalByPeriod(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.incomeService.getTotalByPeriod(startDate, endDate);
  }

  @Query(() => Float, { name: 'totalIncomesByCategory' })
  getTotalByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
    @Args('startDate', { nullable: true }) startDate?: Date,
    @Args('endDate', { nullable: true }) endDate?: Date,
  ) {
    return this.incomeService.getTotalByCategory(categoryId, startDate, endDate);
  }
}