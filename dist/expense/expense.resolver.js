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
exports.ExpenseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const expense_service_1 = require("./expense.service");
const expense_entity_1 = require("./expense.entity");
const create_expense_input_1 = require("./dto/create-expense.input");
const update_expense_input_1 = require("./dto/update-expense.input");
const expense_filters_input_1 = require("./dto/expense-filters.input");
let ExpenseResolver = class ExpenseResolver {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    createExpense(createExpenseInput) {
        return this.expenseService.create(createExpenseInput);
    }
    findAll(filters) {
        return this.expenseService.findAll(filters);
    }
    findOne(id) {
        return this.expenseService.findOne(id);
    }
    updateExpense(updateExpenseInput) {
        return this.expenseService.update(updateExpenseInput.id, updateExpenseInput);
    }
    removeExpense(id) {
        return this.expenseService.remove(id);
    }
    getTotalByPeriod(startDate, endDate) {
        return this.expenseService.getTotalByPeriod(startDate, endDate);
    }
    getTotalByCategory(categoryId, startDate, endDate) {
        return this.expenseService.getTotalByCategory(categoryId, startDate, endDate);
    }
};
exports.ExpenseResolver = ExpenseResolver;
__decorate([
    (0, graphql_1.Mutation)(() => expense_entity_1.Expense),
    __param(0, (0, graphql_1.Args)('createExpenseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_input_1.CreateExpenseInput]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "createExpense", null);
__decorate([
    (0, graphql_1.Query)(() => [expense_entity_1.Expense], { name: 'expenses' }),
    __param(0, (0, graphql_1.Args)('filters', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [expense_filters_input_1.ExpenseFiltersInput]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => expense_entity_1.Expense, { name: 'expense' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => expense_entity_1.Expense),
    __param(0, (0, graphql_1.Args)('updateExpenseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expense_input_1.UpdateExpenseInput]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "updateExpense", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "removeExpense", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float, { name: 'totalExpensesByPeriod' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "getTotalByPeriod", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float, { name: 'totalExpensesByCategory' }),
    __param(0, (0, graphql_1.Args)('categoryId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('startDate', { nullable: true })),
    __param(2, (0, graphql_1.Args)('endDate', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date,
        Date]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "getTotalByCategory", null);
exports.ExpenseResolver = ExpenseResolver = __decorate([
    (0, graphql_1.Resolver)(() => expense_entity_1.Expense),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseResolver);
//# sourceMappingURL=expense.resolver.js.map