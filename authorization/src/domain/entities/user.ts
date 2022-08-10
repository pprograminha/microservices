import { Entity } from '../../core/domain/entities/entity';

type UserProps = {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};


interface IUser extends UserProps {};

export class User extends Entity<UserProps> implements IUser {
  get username(): string {
    return this.props.username
  }
  
  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  constructor(props: UserProps, id?: string) {
    super(props, id);
  }
}
