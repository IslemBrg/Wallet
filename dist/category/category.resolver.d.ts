import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(createCategoryInput: CreateCategoryInput): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    findByType(type: 'expense' | 'income'): Promise<Category[]>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): Promise<Category>;
    removeCategory(id: string): Promise<boolean>;
}
