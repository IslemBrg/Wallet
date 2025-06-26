"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("./expense.entity");
let ExpenseService = class ExpenseService {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async create(createExpenseInput) {
        const expense = this.expenseRepository.create(createExpenseInput);
        return this.expenseRepository.save(expense);
    }
    async findAll(filters) {
        const query = this.expenseRepository.createQueryBuilder('expense')
            .leftJoinAndSelect('expense.category', 'category')
            .orderBy('expense.date', 'DESC');
        if (filters) {
            if (filters.startDate && filters.endDate) {
                query.andWhere('expense.date BETWEEN :startDate AND :endDate', {
                    startDate: filters.startDate,
                    endDate: filters.endDate,
                });
            }
            if (filters.categoryId) {
                query.andWhere('expense.categoryId = :categoryId', {
                    categoryId: filters.categoryId,
                });
            }
            if (filters.minAmount !== undefined) {
                query.andWhere('expense.amount >= :minAmount', {
                    minAmount: filters.minAmount,
                });
            }
            if (filters.maxAmount !== undefined) {
                query.andWhere('expense.amount <= :maxAmount', {
                    maxAmount: filters.maxAmount,
                });
            }
            if (filters.description) {
                query.andWhere('expense.description ILIKE :description', {
                    description: `%${filters.description}%`,
                });
            }
        }
        return query.getMany();
    }
    async findOne(id) {
        const expense = await this.expenseRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
    async update(id, updateExpenseInput) {
        await this.expenseRepository.update(id, updateExpenseInput);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.expenseRepository.delete(id);
        return result.affected > 0;
    }
    async getTotalByPeriod(startDate, endDate) {
        const result = await this.expenseRepository
            .createQueryBuilder('expense')
            .select('SUM(expense.amount)', 'total')
            .where('expense.date BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .getRawOne();
        return parseFloat(result.total) || 0;
    }
    async getTotalByCategory(categoryId, startDate, endDate) {
        const query = this.expenseRepository
            .createQueryBuilder('expense')
            .select('SUM(expense.amount)', 'total')
            .where('expense.categoryId = :categoryId', { categoryId });
        if (startDate && endDate) {
            query.andWhere('expense.date BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            });
        }
        const result = await query.getRawOne();
        return parseFloat(result.total) || 0;
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map