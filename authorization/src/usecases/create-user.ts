import { HashProvider } from '../domain/providers/hash-provider';
import { CreateUserRequestDTO } from '../dtos/create-user-request';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { User } from '../domain/entities/user';
import { UsersRepository } from '../domain/repositories/users-repository';

export class CreateUser {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly hashProvider: HashProvider,
    ) {}

    async execute({ email, password, username }: CreateUserRequestDTO): Promise<User> {
        const checkEmailAlreadyExists = await this.usersRepository.findByEmail(email);

        if (checkEmailAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const hashedPassword = await this.hashProvider.hash(password);

        const user = new User({
            email,
            password: hashedPassword,
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await this.usersRepository.create(user)
        
        return user;
    }
}
