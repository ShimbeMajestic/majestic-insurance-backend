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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types");
const server_1 = require("../../server");
const Policy_1 = require("../../entities/Policy");
const User_1 = require("../../entities/User");
let PolicyResolver = class PolicyResolver {
    userPolicies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
            return policyRepository.find({
                where: { policyholder: { id: userId } },
                relations: ['policyholder']
            });
        });
    }
    allPolicies() {
        return __awaiter(this, void 0, void 0, function* () {
            const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
            return policyRepository.find({ relations: ['policyholder'] });
        });
    }
    createPolicy(policyData_1, _a) {
        return __awaiter(this, arguments, void 0, function* (policyData, { user }) {
            const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
            const userRepository = server_1.AppDataSource.getRepository(User_1.User);
            const policyholder = yield userRepository.findOneOrFail({ where: { id: user.id } });
            const policy = policyRepository.create(Object.assign(Object.assign({}, policyData), { policyholder }));
            return policyRepository.save(policy);
        });
    }
};
exports.PolicyResolver = PolicyResolver;
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)(() => [types_1.PolicyType]),
    __param(0, (0, type_graphql_1.Arg)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolicyResolver.prototype, "userPolicies", null);
__decorate([
    (0, type_graphql_1.Authorized)(['admin']),
    (0, type_graphql_1.Query)(() => [types_1.PolicyType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PolicyResolver.prototype, "allPolicies", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => types_1.PolicyType),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PolicyInput, Object]),
    __metadata("design:returntype", Promise)
], PolicyResolver.prototype, "createPolicy", null);
exports.PolicyResolver = PolicyResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PolicyResolver);
