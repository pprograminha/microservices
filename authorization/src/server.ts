import 'express-async-errors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { SessionsResolver } from './infra/graphql/resolvers/sessions-resolver';
import { UsersResolver } from './infra/graphql/resolvers/users-resolver';

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UsersResolver, SessionsResolver],
    // emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log('Server started on 4000'));
};

main();
