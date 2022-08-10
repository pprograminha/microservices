import { AppError } from '../../../errors/app-error';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { prisma } from '../../prisma/client';
import { GraphqlSessionInput } from '../inputs/session';
import { GraphqlSession } from '../models/session';
import { sign } from 'jsonwebtoken';

@Resolver()
class SessionResolver {
  @Mutation(() => GraphqlSession)
  async session(@Arg('data') data: GraphqlSessionInput) {
    const student = await prisma.student.findUnique({
      where: {
        id: data.studentId,
      },
    });

    if (!student) {
      throw new AppError('Student does not exist', 401);
    }

    const token = sign({}, '*', {
      expiresIn: '1d',
      subject: student.id,
    });

    return {
      student: student,
      token,
    };
  }
}

export { SessionResolver };
