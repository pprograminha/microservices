import { Student } from '../../../domain/entities/student';
import { Field, ObjectType } from 'type-graphql';
import { GraphqlStudent } from './student';

@ObjectType()
export class GraphqlSession {
  @Field(() => GraphqlStudent)
  student: Student;

  @Field()
  token: string;
}
