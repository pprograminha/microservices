import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class GraphqlStudent {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
