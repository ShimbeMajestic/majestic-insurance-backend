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
exports.PolicyInput = exports.ClaimInput = exports.AuthPayload = exports.ClaimType = exports.PolicyType = exports.UserType = void 0;
const type_graphql_1 = require("type-graphql");
let UserType = class UserType {
};
exports.UserType = UserType;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UserType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "role", void 0);
exports.UserType = UserType = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserType);
let PolicyType = class PolicyType {
};
exports.PolicyType = PolicyType;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], PolicyType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PolicyType.prototype, "policyNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PolicyType.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], PolicyType.prototype, "premium", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], PolicyType.prototype, "coverage", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], PolicyType.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], PolicyType.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PolicyType.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserType),
    __metadata("design:type", UserType)
], PolicyType.prototype, "policyholder", void 0);
exports.PolicyType = PolicyType = __decorate([
    (0, type_graphql_1.ObjectType)()
], PolicyType);
let ClaimType = class ClaimType {
};
exports.ClaimType = ClaimType;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], ClaimType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ClaimType.prototype, "claimNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ClaimType.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], ClaimType.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ClaimType.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], ClaimType.prototype, "incidentDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PolicyType),
    __metadata("design:type", PolicyType)
], ClaimType.prototype, "policy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserType),
    __metadata("design:type", UserType)
], ClaimType.prototype, "claimant", void 0);
exports.ClaimType = ClaimType = __decorate([
    (0, type_graphql_1.ObjectType)()
], ClaimType);
let AuthPayload = class AuthPayload {
};
exports.AuthPayload = AuthPayload;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AuthPayload.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserType),
    __metadata("design:type", UserType)
], AuthPayload.prototype, "user", void 0);
exports.AuthPayload = AuthPayload = __decorate([
    (0, type_graphql_1.ObjectType)()
], AuthPayload);
let ClaimInput = class ClaimInput {
};
exports.ClaimInput = ClaimInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ClaimInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], ClaimInput.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], ClaimInput.prototype, "incidentDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ClaimInput.prototype, "policyId", void 0);
exports.ClaimInput = ClaimInput = __decorate([
    (0, type_graphql_1.InputType)()
], ClaimInput);
let PolicyInput = class PolicyInput {
};
exports.PolicyInput = PolicyInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PolicyInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], PolicyInput.prototype, "premium", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], PolicyInput.prototype, "coverage", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], PolicyInput.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], PolicyInput.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 'active' }),
    __metadata("design:type", String)
], PolicyInput.prototype, "status", void 0);
exports.PolicyInput = PolicyInput = __decorate([
    (0, type_graphql_1.InputType)()
], PolicyInput);
