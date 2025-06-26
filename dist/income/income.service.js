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
exports.IncomeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const income_entity_1 = require("./income.entity");
let IncomeService = class IncomeService {
    constructor(incomeRepository) {
        this.incomeRepository = incomeRepository;
    }
    async create(createIncomeInput) {
        const income = this.incomeRepository.create(createIncomeInput);
        return this.incomeRepository.save(income);
    }
    async findAll(filters) {
        const query = this.incomeRepository.createQueryBuilder('income')
            .leftJoinAndSelect('income.category', 'category')
            .orderBy('income.date', 'DESC');
        if (filters) {
            if (filters.startDate && filters.endDate) {
                query.andWhere('income.date BETWEEN :startDate AND :endDate', {
                    startDate: filters.startDate,
                    endDate: filters.endDate,
                });
            }
            if (filters.categoryId) {
                query.andWhere('income.categoryId = :categoryId', {
                    categoryId: filters.categoryId,
                });
            }
            if (filters.minAmount !== undefined) {
                query.andWhere('income.amount >= :minAmount', {
                    minAmount: filters.minAmount,
                });
            }
            if (filters.maxAmount !== undefined) {
                query.andWhere('income.amount <= :maxAmount', {
                    maxAmount: filters.maxAmount,
                });
            }
            if (filters.description) {
                query.andWhere('income.description ILIKE :description', {
                    description: `%${filters.description}%`,
                });
            }
        }
        return query.getMany();
    }
    async findOne(id) {
        const income = await this.incomeRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!income) {
            throw new common_1.NotFoundException(`Income with ID ${id} not found`);
        }
        return income;
    }
    async update(id, updateIncomeInput) {
        await this.incomeRepository.update(id, updateIncomeInput);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.incomeRepository.delete(id);
        return result.affected > 0;
    }
    async getTotalByPeriod(startDate, endDate) {
        const result = await this.incomeRepository
            .createQueryBuilder('income')
            .select('SUM(income.amount)', 'total')
            .where('income.date BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .getRawOne();
        return parseFloat(result.total) || 0;
    }
    async getTotalByCategory(categoryId, startDate, endDate) {
        const query = this.incomeRepository
            .createQueryBuilder('income')
            .select('SUM(income.amount)', 'total')
            .where('income.categoryId = :categoryId', { categoryId });
        if (startDate && endDate) {
            query.andWhere('income.date BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            });
        }
        const result = await query.getRawOne();
        return parseFloat(result.total) || 0;
    }
};
exports.IncomeService = IncomeService;
exports.IncomeService = IncomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(income_entity_1.Income)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IncomeService);
//# sourceMappingURL=income.service.js.map