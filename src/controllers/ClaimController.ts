import { Request, Response } from 'express';
import { AppDataSource } from '../server';
import { Claim } from '../entities/Claim';
import { Policy } from '../entities/Policy';
import { User } from '../entities/User';

export class ClaimController {
    static async createClaim(req: Request, res: Response) {
        try {
            const { description, amount, incidentDate, policyId, userId } = req.body;
            
            const claimRepository = AppDataSource.getRepository(Claim);
            const policyRepository = AppDataSource.getRepository(Policy);
            const userRepository = AppDataSource.getRepository(User);

            const policy = await policyRepository.findOne({ where: { id: policyId } });
            const claimant = await userRepository.findOne({ where: { id: userId } });

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

            await claimRepository.save(claim);
            res.status(201).json(claim);
        } catch (error) {
            res.status(500).json({ message: 'Error creating claim' });
        }
    }

    static async getUserClaims(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const claimRepository = AppDataSource.getRepository(Claim);
            
            const claims = await claimRepository.find({
                where: { claimant: { id: userId } }
            });

            res.json(claims);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching claims' });
        }
    }

    static async updateClaimStatus(req: Request, res: Response) {
        try {
            const { claimId } = req.params;
            const { status } = req.body;
            
            const claimRepository = AppDataSource.getRepository(Claim);
            const claim = await claimRepository.findOne({ where: { id: claimId } });

            if (!claim) {
                return res.status(404).json({ message: 'Claim not found' });
            }

            claim.status = status;
            await claimRepository.save(claim);

            res.json(claim);
        } catch (error) {
            res.status(500).json({ message: 'Error updating claim' });
        }
    }
}