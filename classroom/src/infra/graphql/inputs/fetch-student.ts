import { Field, InputType } from 'type-graphql';

@InputType()
export class GraphqlFetchStudentInput {
  @Field({ nullable: true })
  studentId: string;
}
