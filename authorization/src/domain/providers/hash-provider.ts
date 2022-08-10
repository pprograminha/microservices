
export interface HashProvider {
    hash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>
}