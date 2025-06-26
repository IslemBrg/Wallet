import { Category } from '../category/category.entity';
export declare class Income {
    id: string;
    amount: number;
    description: string;
    date: Date;
    notes?: string;
    category: Category;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}
