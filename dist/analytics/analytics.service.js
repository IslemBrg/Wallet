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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const expense_service_1 = require("../expense/expense.service");
const income_service_1 = require("../income/income.service");
let AnalyticsService = class AnalyticsService {
    constructor(expenseService, incomeService) {
        this.expenseService = expenseService;
        this.incomeService = incomeService;
    }
    async getWalletSummary(startDate, endDate) {
        const [totalExpenses, totalIncomes] = await Promise.all([
            this.expenseService.getTotalByPeriod(startDate, endDate),
            this.incomeService.getTotalByPeriod(startDate, endDate),
        ]);
        const netAmount = totalIncomes - totalExpenses;
        const savingsRate = totalIncomes > 0 ? ((netAmount / totalIncomes) * 100) : 0;
        return {
            totalExpenses,
            totalIncomes,
            netAmount,
            savingsRate,
            period: {
                startDate,
                endDate,
            },
        };
    }
    async getPeriodAnalytics(year, month) {
        let startDate;
        let endDate;
        if (month) {
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0);
        }
        else {
            startDate = new Date(year, 0, 1);
            endDate = new Date(year, 11, 31);
        }
        const summary = await this.getWalletSummary(startDate, endDate);
        return {
            year,
            month,
            summary,
            period: {
                startDate,
                endDate,
            },
        };
    }
    async getMonthlyComparison(year) {
        const monthlyData = [];
        for (let month = 1; month <= 12; month++) {
            const analytics = await this.getPeriodAnalytics(year, month);
            monthlyData.push(analytics);
        }
        return monthlyData;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        income_service_1.IncomeService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map