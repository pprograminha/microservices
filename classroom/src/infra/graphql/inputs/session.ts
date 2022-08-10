import { Field, InputType } from 'type-graphql';

@InputType()
export class GraphqlSessionInput {
  @Field()
  studentId: string;
}
