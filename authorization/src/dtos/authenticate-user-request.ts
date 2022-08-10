import { Maybe } from "type-graphql";

export type AuthenticateUserRequestDTO = {
    username: Maybe<string>;
    email: Maybe<string>;
    password: string;
}