import { AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';

export interface Context {
  req: any;
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  try {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;

    if (roles.length === 0) {
      return true;
    }

    return roles.includes(user.role);
  } catch {
    return false;
  }
};