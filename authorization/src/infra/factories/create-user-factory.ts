import { CreateUser } from "../../usecases/create-user";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository";
import { BcryptJSHashProvider } from "../providers/bcryptjs-hash-provider";

export function makeCreateUserFactory(): CreateUser {
    const prismaUsersRepository = new PrismaUsersRepository()
    const bcryptJSHashProvider =  new BcryptJSHashProvider()

    const createUser = new CreateUser(prismaUsersRepository, bcryptJSHashProvider)

    return createUser
}