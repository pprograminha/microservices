import { User } from '@prisma/client';
import { HashProvider } from '../domain/providers/hash-provider';
import { UsersRepository } from '../domain/repositories/users-repository';
import { AuthenticateUserRequestDTO } from '../dtos/authenticate-user-request';
import { UserNotFoundError } from '../errors/user-not-found-error';

export class AuthenticateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ email, password, username }: AuthenticateUserRequestDTO): Promise<User> {
    let user: User
    

    if (email) {
      user = await this.usersRepository.findByEmail(email)
    }

    if (username) {
      user = await this.usersRepository.findByUsername(username)
    }

    if (!user) {
      throw new UserNotFoundError();
    }

    const matchedPassword = await this.hashProvider.compareHash(password, user.password);

    if(!matchedPassword) {
      throw new UserNotFoundError();
    }


    return user;
  }
}
