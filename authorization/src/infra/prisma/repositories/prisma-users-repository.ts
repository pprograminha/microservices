import { User } from "../../../domain/entities/user";
import { UserMapper } from "../../../infra/mappers/user-mapper";
import { AsyncMaybe } from "../../../core/logic/maybe";
import { UsersRepository } from "../../../domain/repositories/users-repository";
import { prisma } from "../client";

export class PrismaUsersRepository implements UsersRepository {
    async create(user: User): Promise<void> {
        const data = UserMapper.toPersistence(user);

        await prisma.user.create({ data });
    }

    async findByEmail(email: string): AsyncMaybe<User> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if(!user) {
            return null
        }

        return UserMapper.toDomain(user);
    }

    async findByUsername(username: string): AsyncMaybe<User> {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        })

        if(!user) {
            return null
        }

        return UserMapper.toDomain(user);
    }
}