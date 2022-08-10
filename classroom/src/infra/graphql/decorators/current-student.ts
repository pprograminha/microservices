import { prisma } from '../../prisma/client';
import { createParamDecorator } from 'type-graphql';
import { AuthStudent } from 'src/infra/utils/get-auth-student';
import { Student } from '@prisma/client';

type Context = {
  student: AuthStudent;
};

const CurrentStudent = () =>
  createParamDecorator<Context>(async ({ context }): Promise<Student> => {
    const student = await prisma.student.findUnique({
      where: {
        id: context.student.id,
      },
    });

    return student;
  });

export { CurrentStudent };
