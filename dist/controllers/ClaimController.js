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
exports.ClaimController = void 0;
const server_1 = require("../server");
const Claim_1 = require("../entities/Claim");
const Policy_1 = require("../entities/Policy");
const User_1 = require("../entities/User");
class ClaimController {
    static createClaim(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, amount, incidentDate, policyId, userId } = req.body;
                const claimRepository = server_1.AppDataSource.getRepository(Claim_1.Claim);
                const policyRepository = server_1.AppDataSource.getRepository(Policy_1.Policy);
                const userRepository = server_1.AppDataSource.getRepository(User_1.User);
                const policy = yield policyRepository.findOne({ where: { id: policyId } });
                const claimant = yield userRepository.findOne({ where: { id: userId } });
                if (!policy || !claimant) {
                    return res.status(404).json({ message: 'Policy or User not found' });
                }
                const claimNumber = `CLM-${Date.now()}`;
                const claim = claimRepository.create({
                    claimNumber,
                    description,
                    amount,
                    incidentDate,
                    policy,
                    claimant
                });
                yield claimRepository.save(claim);
                res.status(201).json(claim);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating claim' });
            }
        });
    }
    static getUserClaims(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const claimRepository = server_1.AppDataSource.getRepository(Claim_1.Claim);
                const claims = yield claimRepository.find({
                    where: { claimant: { id: userId } }
                });
                res.json(claims);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching claims' });
            }
        });
    }
    static updateClaimStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { claimId } = req.params;
                const { status } = req.body;
                const claimRepository = server_1.AppDataSource.getRepository(Claim_1.Claim);
                const claim = yield claimRepository.findOne({ where: { id: claimId } });
                if (!claim) {
                    return res.status(404).json({ message: 'Claim not found' });
                }
                claim.status = status;
                yield claimRepository.save(claim);
                res.json(claim);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating claim' });
            }
        });
    }
}
exports.ClaimController = ClaimController;
