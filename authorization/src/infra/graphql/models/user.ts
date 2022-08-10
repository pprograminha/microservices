import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class GraphqlUser {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
