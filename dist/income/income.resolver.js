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
exports.IncomeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const income_service_1 = require("./income.service");
const income_entity_1 = require("./income.entity");
const create_income_input_1 = require("./dto/create-income.input");
const update_income_input_1 = require("./dto/update-income.input");
const income_filters_input_1 = require("./dto/income-filters.input");
let IncomeResolver = class IncomeResolver {
    constructor(incomeService) {
        this.incomeService = incomeService;
    }
    createIncome(createIncomeInput) {
        return this.incomeService.create(createIncomeInput);
    }
    findAll(filters) {
        return this.incomeService.findAll(filters);
    }
    findOne(id) {
        return this.incomeService.findOne(id);
    }
    updateIncome(updateIncomeInput) {
        return this.incomeService.update(updateIncomeInput.id, updateIncomeInput);
    }
    removeIncome(id) {
        return this.incomeService.remove(id);
    }
    getTotalByPeriod(startDate, endDate) {
        return this.incomeService.getTotalByPeriod(startDate, endDate);
    }
    getTotalByCategory(categoryId, startDate, endDate) {
        return this.incomeService.getTotalByCategory(categoryId, startDate, endDate);
    }
};
exports.IncomeResolver = IncomeResolver;
__decorate([
    (0, graphql_1.Mutation)(() => income_entity_1.Income),
    __param(0, (0, graphql_1.Args)('createIncomeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_income_input_1.CreateIncomeInput]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "createIncome", null);
__decorate([
    (0, graphql_1.Query)(() => [income_entity_1.Income], { name: 'incomes' }),
    __param(0, (0, graphql_1.Args)('filters', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [income_filters_input_1.IncomeFiltersInput]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => income_entity_1.Income, { name: 'income' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => income_entity_1.Income),
    __param(0, (0, graphql_1.Args)('updateIncomeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_income_input_1.UpdateIncomeInput]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "updateIncome", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "removeIncome", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float, { name: 'totalIncomesByPeriod' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "getTotalByPeriod", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float, { name: 'totalIncomesByCategory' }),
    __param(0, (0, graphql_1.Args)('categoryId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('startDate', { nullable: true })),
    __param(2, (0, graphql_1.Args)('endDate', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date,
        Date]),
    __metadata("design:returntype", void 0)
], IncomeResolver.prototype, "getTotalByCategory", null);
exports.IncomeResolver = IncomeResolver = __decorate([
    (0, graphql_1.Resolver)(() => income_entity_1.Income),
    __metadata("design:paramtypes", [income_service_1.IncomeService])
], IncomeResolver);
//# sourceMappingURL=income.resolver.js.map