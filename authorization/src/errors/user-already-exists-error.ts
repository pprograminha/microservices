import { DomainError } from "../domain/errors/error";

export class UserAlreadyExistsError extends Error implements DomainError {
  constructor() {
    super(`User already exists`);

    this.name = "UserAlreadyExistsError";
  }
}