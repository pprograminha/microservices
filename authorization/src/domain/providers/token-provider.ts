
export interface TokenProvider {
    sign(payload: string): Promise<string>;
    verify(token: string): Promise<boolean>
}