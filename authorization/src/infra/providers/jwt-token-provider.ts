import { compare, hash} from 'bcryptjs'
import { HashProvider } from 'src/domain/providers/hash-provider';

export class JWTokenProvider implements TokenProvider {
    async hash(payload: string): Promise<string> {
        return hash(payload, 10)
    }
    
    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed)
    }
}