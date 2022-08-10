import { Field, InputType } from 'type-graphql';

@InputType()
export class GraphqlCreateUserInput {
  @Field()
  username: string;
  
  @Field()
  email: string;
  
  @Field()
  password: string;
}
