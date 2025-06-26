import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Category } from '../category/category.entity';

@Entity('incomes')
@ObjectType()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  amount: number;

  @Column()
  @Field()
  description: string;

  @Column({ type: 'date' })
  @Field()
  date: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes?: string;

  @ManyToOne(() => Category, category => category.incomes, { eager: true })
  @Field(() => Category)
  category: Category;

  @Column()
  categoryId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}