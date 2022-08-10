import { makeAuthenticateUserFactory } from '../../../infra/factories/authenticate-user-factory';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { GraphqlSessionInput } from '../inputs/session';
import { GraphqlSession } from '../models/session';

@Resolver()
class SessionsResolver {
  @Mutation(() => GraphqlSession)
  async session(@Arg('data') data: GraphqlSessionInput) {
    return makeAuthenticateUserFactory().execute(data);
  }
}

export { SessionsResolver };
