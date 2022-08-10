import { Request } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../errors/app-error';
import { prisma } from '../prisma/client';

type Context = {
  req: Request;
  student: {
    id: string;
  };
};

export type TokenPayload = {
  sub: string;
  iat: number;
  exp: number;
};

export const EnsureAuthenticated: MiddlewareFn<Context> = async (
  { context },
  next,
) => {
  const { authorization } = context.req.headers;

  if (!authorization) {
    throw new AppError('Not authenticated 1', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AppError('Not authenticated 2', 401);
  }

  try {
    const decoded = verify(token, '*') as TokenPayload;

    const student = await prisma.student.findUnique({
      where: {
        id: decoded.sub,
      },
    });

    if (!student) {
      throw new AppError('Not authenticated 3', 401);
    }

    return await next();
  } catch {
    throw new AppError('Not authenticated 4', 401);
  }
};
