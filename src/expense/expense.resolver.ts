import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { ExpenseFiltersInput } from './dto/expense-filters.input';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation(() => Expense)
  createExpense(@Args('createExpenseInput') createExpenseInput: CreateExpenseInput) {
    return this.expenseService.create(createExpenseInput);
  }

  @Query(() => [Expense], { name: 'expenses' })
  findAll(@Args('filters', { nullable: true }) filters?: ExpenseFiltersInput) {
    return this.expenseService.findAll(filters);
  }

  @Query(() => Expense, { name: 'expense' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.expenseService.findOne(id);
  }

  @Mutation(() => Expense)
  updateExpense(@Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput) {
    return this.expenseService.update(updateExpenseInput.id, updateExpenseInput);
  }

  @Mutation(() => Boolean)
  removeExpense(@Args('id', { type: () => ID }) id: string) {
    return this.expenseService.remove(id);
  }

  @Query(() => Float, { name: 'totalExpensesByPeriod' })
  getTotalByPeriod(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.expenseService.getTotalByPeriod(startDate, endDate);
  }

  @Query(() => Float, { name: 'totalExpensesByCategory' })
  getTotalByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
    @Args('startDate', { nullable: true }) startDate?: Date,
    @Args('endDate', { nullable: true }) endDate?: Date,
  ) {
    return this.expenseService.getTotalByCategory(categoryId, startDate, endDate);
  }
}