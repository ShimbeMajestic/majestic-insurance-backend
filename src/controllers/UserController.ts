import { Request, Response } from 'express';
import { AppDataSource } from '../server';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password, phoneNumber } = req.body;

            const userRepository = AppDataSource.getRepository(User);
            
            // Check if user exists
            const existingUser = await userRepository.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phoneNumber
            });

            await userRepository.save(user);

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userRepository = AppDataSource.getRepository(User);

            // Find user
            const user = await userRepository.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET || 'fallback_secret',
                { expiresIn: '24h' }
            );

            res.json({ token, user: { 
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }});
        } catch (error) {
            res.status(500).json({ message: 'Error during login' });
        }
    }
}