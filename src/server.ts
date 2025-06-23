import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { PolicyResolver } from './graphql/resolvers/policy.resolver';
import { ClaimResolver } from './graphql/resolvers/claim.resolver';
import { authChecker } from './middleware/authChecker';
import { BaseContext } from '@apollo/server';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();
interface MyContext extends BaseContext {
  req: Request;
  token?: string;
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

const app = express();

// PostgreSQL connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "majestic_insurance",
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  subscribers: [],
  migrations: [],
});

async function startServer() {
  await AppDataSource.initialize();
  console.log("✅ Database connection initialized successfully!");

  const schema = await buildSchema({
    resolvers: [UserResolver, PolicyResolver, ClaimResolver],
    authChecker,
    validate: false,
  });

  const server = new ApolloServer<MyContext>({
    schema,
    introspection: true,
  });

  await server.start();
  console.log("✅ Apollo Server started successfully!");

  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5003'],
    credentials: true
  }));
  
  app.use(express.json());
  
  // Enable file uploads
  app.use(graphqlUploadExpress());

  // Serve uploaded images statically
  app.use('/uploads', express.static('uploads'));

  // Root route handler
  app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Majestic Insurance API is running' });
  });

  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }): Promise<MyContext> => {
      const token = req.headers.authorization?.split(' ')[1] || '';
      let user;
      
      if (token) {
        try {
          // Verify and decode the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
          user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
          };
        } catch (error) {
          console.error('Token verification failed:', error);
        }
      }

      return { 
        req,
        token,
        user 
      };
    },
  }));

  const PORT = 4000;  // Changed to a different port to avoid conflicts
  app.listen(PORT, 'localhost', () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
    console.log(`📊 GraphQL Playground available at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(console.error);

function graphqlUploadExpress(): any {
  throw new Error('Function not implemented.');
}
