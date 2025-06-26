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
exports.WalletSummary = void 0;
const graphql_1 = require("@nestjs/graphql");
const date_period_dto_1 = require("./date-period.dto");
let WalletSummary = class WalletSummary {
};
exports.WalletSummary = WalletSummary;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], WalletSummary.prototype, "totalExpenses", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], WalletSummary.prototype, "totalIncomes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], WalletSummary.prototype, "netAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], WalletSummary.prototype, "savingsRate", void 0);
__decorate([
    (0, graphql_1.Field)(() => date_period_dto_1.DatePeriod),
    __metadata("design:type", date_period_dto_1.DatePeriod)
], WalletSummary.prototype, "period", void 0);
exports.WalletSummary = WalletSummary = __decorate([
    (0, graphql_1.ObjectType)()
], WalletSummary);
//# sourceMappingURL=wallet-summary.dto.js.map