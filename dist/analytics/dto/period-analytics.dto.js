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
exports.PeriodAnalytics = void 0;
const graphql_1 = require("@nestjs/graphql");
const wallet_summary_dto_1 = require("./wallet-summary.dto");
const date_period_dto_1 = require("./date-period.dto");
let PeriodAnalytics = class PeriodAnalytics {
};
exports.PeriodAnalytics = PeriodAnalytics;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PeriodAnalytics.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PeriodAnalytics.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(() => wallet_summary_dto_1.WalletSummary),
    __metadata("design:type", wallet_summary_dto_1.WalletSummary)
], PeriodAnalytics.prototype, "summary", void 0);
__decorate([
    (0, graphql_1.Field)(() => date_period_dto_1.DatePeriod),
    __metadata("design:type", date_period_dto_1.DatePeriod)
], PeriodAnalytics.prototype, "period", void 0);
exports.PeriodAnalytics = PeriodAnalytics = __decorate([
    (0, graphql_1.ObjectType)()
], PeriodAnalytics);
//# sourceMappingURL=period-analytics.dto.js.map