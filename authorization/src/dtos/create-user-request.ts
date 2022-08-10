import { Maybe } from "type-graphql";

export type CreateUserRequestDTO = {
    username: Maybe<string>;
    email: Maybe<string>;
    password: string;
}