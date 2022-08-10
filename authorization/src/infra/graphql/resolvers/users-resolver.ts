import { makeCreateUserFactory } from '../../../infra/factories/create-user-factory';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { GraphqlCreateUserInput } from '../inputs/create-user';
import { GraphqlUser } from '../models/user';

@Resolver(GraphqlUser)
class UsersResolver {
  @Mutation(() => GraphqlUser)
  async createUser(@Arg('data') data: GraphqlCreateUserInput) {
    return makeCreateUserFactory().execute(data);
  }
}

export { UsersResolver };
