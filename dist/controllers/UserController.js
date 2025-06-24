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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const server_1 = require("../server");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password, phoneNumber } = req.body;
                const userRepository = server_1.AppDataSource.getRepository(User_1.User);
                // Check if user exists
                const existingUser = yield userRepository.findOne({ where: { email } });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                // Hash password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Create new user
                const user = userRepository.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    phoneNumber
                });
                yield userRepository.save(user);
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating user' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userRepository = server_1.AppDataSource.getRepository(User_1.User);
                // Find user
                const user = yield userRepository.findOne({ where: { email } });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                // Check password
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!validPassword) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                // Generate JWT
                const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });
                res.json({ token, user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    } });
            }
            catch (error) {
                res.status(500).json({ message: 'Error during login' });
            }
        });
    }
}
exports.UserController = UserController;
