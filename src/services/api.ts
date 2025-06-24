import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../graphql/resolvers/user.resolver';
import { PolicyResolver } from '../graphql/resolvers/policy.resolver';
import { ClaimResolver } from '../graphql/resolvers/claim.resolver';
import { authChecker } from '../middleware/authChecker';

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PolicyResolver, ClaimResolver],
    authChecker,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  return server;
};