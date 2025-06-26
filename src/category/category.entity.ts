import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from '../expense/expense.entity';
import { Income } from '../income/income.entity';

@Entity('categories')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ default: '#3B82F6' })
  @Field()
  color: string;

  @Column({ type: 'enum', enum: ['expense', 'income', 'both'], default: 'both' })
  @Field()
  type: 'expense' | 'income' | 'both';

  @OneToMany(() => Expense, expense => expense.category)
  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  @OneToMany(() => Income, income => income.category)
  @Field(() => [Income], { nullable: true })
  incomes?: Income[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}