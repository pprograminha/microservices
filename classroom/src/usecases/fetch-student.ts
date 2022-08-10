import { Student } from '@prisma/client';
import { GraphqlFetchStudentInput } from 'src/infra/graphql/inputs/fetch-student';
import { prisma } from '../infra/prisma/client';

export class FetchStudentUseCase {
  async execute({ studentId }: GraphqlFetchStudentInput): Promise<Student> {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      throw new Error('Student does not exist');
    }

    return student;
  }
}
