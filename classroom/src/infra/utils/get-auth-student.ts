import { verify } from 'jsonwebtoken';
import { TokenPayload } from '../middlewares/ensure-authenticated';

export type AuthStudent = {
  id: string;
};

const getAuthStudent = (authorization?: string): AuthStudent | null => {
  let student: AuthStudent | null = null;

  if (authorization) {
    const [, token] = authorization.split(' ');

    try {
      if (token) {
        const decoded = verify(token, '*') as TokenPayload;

        student = {
          id: decoded.sub,
        };
      }
    } catch {}
  }

  return student;
};

export { getAuthStudent };
