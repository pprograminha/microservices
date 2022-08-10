import { User } from '../entities/user';
import { AsyncMaybe } from '../../maybe';

export interface UsersRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): AsyncMaybe<User>;
    findByUsername(username: string): AsyncMaybe<User>;
}