import { User as PersistenceUser } from '@prisma/client'
import { User } from '../../domain/entities/user';

export class UserMapper {
    static toDomain(raw: PersistenceUser): User {
        const user = new User({
            username: raw.username,
            email: raw.email,
            password: raw.password,
        }, {
            id: raw.id,
            updatedAt: raw.updatedAt,
            createdAt: raw.createdAt,
        })

        return user
    }

    static toPersistence(user: User) {
        const raw = {
            username: user.username,
            email: user.email,
            password: user.password,
        }

        return raw
    }
}