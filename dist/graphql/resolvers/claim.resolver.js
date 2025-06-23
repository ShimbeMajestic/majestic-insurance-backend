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
exports.ClaimResolver = void 0;
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types");
const server_1 = require("../../server");
const Claim_1 = require("../../entities/Claim");
const Policy_1 = require("../../entities/Policy");
let ClaimResolver = class ClaimResolver {
    userClaims(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const claimRepository = server_1.AppDataSource.getRepository(Claim_1.Claim);
            return claimRepository.find({
                where: { claimant: { id: userId } },
                relations: ['policy', 'claimant']
            });
        });
    }
    createClaim(claimData_1, _a) {
        return __awaiter(this, arguments, void 0, function* (claimData, { user }) {
            const claimRepository = server_1.AppDataSource.getRepository(Claim_1.Claim);
            const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
            const policy = yield policyRepository.findOneOrFail({
                where: { id: claimData.policyId },
                relations: ['policyholder']
            });
            if (policy.policyholder.id !== user.id) {
                throw new Error('Unauthorized to create claim for this policy');
            }
            const claim = claimRepository.create(Object.assign(Object.assign({}, claimData), { policy, claimant: policy.policyholder, status: 'pending' }));
            return claimRepository.save(claim);
        });
    }
};
exports.ClaimResolver = ClaimResolver;
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)(() => [types_1.ClaimType]),
    __param(0, (0, type_graphql_1.Arg)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClaimResolver.prototype, "userClaims", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => types_1.ClaimType),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.ClaimInput, Object]),
    __metadata("design:returntype", Promise)
], ClaimResolver.prototype, "createClaim", null);
exports.ClaimResolver = ClaimResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ClaimResolver);
