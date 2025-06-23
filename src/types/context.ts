import { Request } from 'express';
import { BaseContext } from '@apollo/server';

export interface MyContext extends BaseContext {
  req: Request;
  token?: string;
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}