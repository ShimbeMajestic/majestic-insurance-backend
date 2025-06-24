import { Request, Response } from 'express';
import { AppDataSource } from '../server';
import { Policy } from '../entities/Policy';
import { User } from '../entities/User';

export class PolicyController {
    static async createPolicy(req: Request, res: Response) {
        try {
            const { policyNumber, type, premium, coverage, startDate, endDate, userId } = req.body;
            
            const policyRepository = AppDataSource.getRepository(Policy);
            const userRepository = AppDataSource.getRepository(User);

            const policyholder = await userRepository.findOne({ where: { id: userId } });
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

            await policyRepository.save(policy);
            res.status(201).json(policy);
        } catch (error) {
            res.status(500).json({ message: 'Error creating policy' });
        }
    }

    static async getUserPolicies(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const policyRepository = AppDataSource.getRepository(Policy);
            
            const policies = await policyRepository.find({
                where: { policyholder: { id: userId } }
            });

            res.json(policies);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching policies' });
        }
    }

    static async getAllPolicies(req: Request, res: Response) {
        try {
            const policyRepository = AppDataSource.getRepository(Policy);
            const policies = await policyRepository.find({
                relations: ['policyholder']
            });
            res.json(policies);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching policies' });
        }
    }
}