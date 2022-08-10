import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository";
import { BcryptJSHashProvider } from "../providers/bcryptjs-hash-provider";
import { AuthenticateUser } from "../../usecases/authenticate-user";

export function makeAuthenticateUserFactory(): AuthenticateUser {
    const prismaUsersRepository = new PrismaUsersRepository()
    const bcryptJSHashProvider =  new BcryptJSHashProvider()

    const authenticateUser = new AuthenticateUser(prismaUsersRepository, bcryptJSHashProvider)

    return authenticateUser
}