import { User } from '../../../domain/entities/user';
import { Field, ObjectType } from 'type-graphql';
import { GraphqlUser } from './user';

@ObjectType()
export class GraphqlSession {
  @Field(() => GraphqlUser)
  user: User;

  @Field()
  token: string;
}
