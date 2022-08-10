import 'express-async-errors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { SessionResolver } from './infra/graphql/resolvers/session-resolver';
import { StudentResolver } from './infra/graphql/resolvers/student-resolver';
import { getAuthStudent } from './infra/utils/get-auth-student';
import { AppError } from './errors/app-error';

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [StudentResolver, SessionResolver],
    emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      student: getAuthStudent(req.headers.authorization),
    }),
  });

  await apolloServer.start();

  app.use((error, request, response, _) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).send({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).send({
      status: 'error',
      message: 'Internal server error',
    });
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log('Server started on 4000'));
};

main();
