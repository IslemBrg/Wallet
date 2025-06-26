import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryInput: CreateCategoryInput): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryInput: UpdateCategoryInput): Promise<Category>;
    remove(id: string): Promise<boolean>;
    findByType(type: 'expense' | 'income'): Promise<Category[]>;
}
