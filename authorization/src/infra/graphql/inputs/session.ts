import { Field, InputType } from 'type-graphql';

@InputType()
export class GraphqlSessionInput {
  @Field({ nullable: true })
  username: string;
  
  @Field({ nullable: true })
  email: string;
  
  @Field()
  password: string;
}
