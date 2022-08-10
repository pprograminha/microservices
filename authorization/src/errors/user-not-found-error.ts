import { DomainError } from "../domain/errors/error";

export class UserNotFoundError extends Error implements DomainError {
  constructor() {
    super(`User does not exists`);

    this.name = "UserNotFoundError";
  }
}