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
exports.AnalyticsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const analytics_service_1 = require("./analytics.service");
const wallet_summary_dto_1 = require("./dto/wallet-summary.dto");
const period_analytics_dto_1 = require("./dto/period-analytics.dto");
let AnalyticsResolver = class AnalyticsResolver {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getWalletSummary(startDate, endDate) {
        return this.analyticsService.getWalletSummary(startDate, endDate);
    }
    getPeriodAnalytics(year, month) {
        return this.analyticsService.getPeriodAnalytics(year, month);
    }
    getMonthlyComparison(year) {
        return this.analyticsService.getMonthlyComparison(year);
    }
};
exports.AnalyticsResolver = AnalyticsResolver;
__decorate([
    (0, graphql_1.Query)(() => wallet_summary_dto_1.WalletSummary, { name: 'walletSummary' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], AnalyticsResolver.prototype, "getWalletSummary", null);
__decorate([
    (0, graphql_1.Query)(() => period_analytics_dto_1.PeriodAnalytics, { name: 'periodAnalytics' }),
    __param(0, (0, graphql_1.Args)('year', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('month', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AnalyticsResolver.prototype, "getPeriodAnalytics", null);
__decorate([
    (0, graphql_1.Query)(() => [period_analytics_dto_1.PeriodAnalytics], { name: 'monthlyComparison' }),
    __param(0, (0, graphql_1.Args)('year', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnalyticsResolver.prototype, "getMonthlyComparison", null);
exports.AnalyticsResolver = AnalyticsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsResolver);
//# sourceMappingURL=analytics.resolver.js.map