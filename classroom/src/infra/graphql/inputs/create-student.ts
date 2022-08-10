import { Field, InputType } from 'type-graphql';

@InputType()
export class GraphqlCreateStudentInput {
  @Field()
  name: string;
}
