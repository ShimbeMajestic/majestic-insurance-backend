"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authChecker = ({ context }, roles) => {
    try {
        const authHeader = context.req.headers.authorization;
        if (!authHeader) {
            return false;
        }
        const token = authHeader.split(' ')[1];
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        if (roles.length === 0) {
            return true;
        }
        return roles.includes(user.role);
    }
    catch (_a) {
        return false;
    }
};
exports.authChecker = authChecker;
