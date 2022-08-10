import crypto from 'node:crypto';
import { Student } from '../../../domain/entities/student';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { prisma } from '../../prisma/client';
import { EnsureAuthenticated } from '../../middlewares/ensure-authenticated';
import { CurrentStudent } from '../decorators/current-student';
import { GraphqlCreateStudentInput } from '../inputs/create-student';
import { GraphqlStudent } from '../models/student';
import { GraphqlFetchStudentInput } from '../inputs/fetch-student';
import { FetchStudentUseCase } from '../../../usecases/fetch-student';

@Resolver(GraphqlStudent)
class StudentResolver {
  @Query(() => GraphqlStudent)
  @UseMiddleware(EnsureAuthenticated)
  async fetchStudent(
    @Arg('data', { nullable: true }) data: GraphqlFetchStudentInput,
    @CurrentStudent() currentStudent: Student,
  ) {
    let student: Student = currentStudent;

    if (data && data.studentId) {
      const fetchStudentUseCase = new FetchStudentUseCase();

      student = await fetchStudentUseCase.execute({
        studentId: data.studentId,
      });
    }

    return student;
  }

  @Mutation(() => GraphqlStudent)
  async createStudent(@Arg('data') data: GraphqlCreateStudentInput) {
    const student = await prisma.student.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
      },
    });

    return student;
  }
}

export { StudentResolver };
