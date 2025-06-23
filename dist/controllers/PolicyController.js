"use strict";
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
exports.PolicyController = void 0;
const server_1 = require("../server");
const Policy_1 = require("../entities/Policy");
const User_1 = require("../entities/User");
class PolicyController {
    static createPolicy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { policyNumber, type, premium, coverage, startDate, endDate, userId } = req.body;
                const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
                const userRepository = server_1.AppDataSource.getRepository(User_1.User);
                const policyholder = yield userRepository.findOne({ where: { id: userId } });
                if (!policyholder) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const policy = policyRepository.create({
                    policyNumber,
                    type,
                    premium,
                    coverage,
                    startDate,
                    endDate,
                    policyholder
                });
                yield policyRepository.save(policy);
                res.status(201).json(policy);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating policy' });
            }
        });
    }
    static getUserPolicies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
                const policies = yield policyRepository.find({
                    where: { policyholder: { id: userId } }
                });
                res.json(policies);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching policies' });
            }
        });
    }
    static getAllPolicies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
                const policies = yield policyRepository.find({
                    relations: ['policyholder']
                });
                res.json(policies);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching policies' });
            }
        });
    }
}
exports.PolicyController = PolicyController;
