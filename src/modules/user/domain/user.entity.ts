import { AggregateRoot } from 'src/core/aggregate-root';
import { UniqueId } from 'src/core/unique-entity-id';
import { UserCreatedEvent } from './events/user-created.event';
import { UserDeletedEvent } from './events/user-deleted.event';
import { UserUpdatedEvent } from './events/user-updated.event';
import { UserWelcomedEvent } from './events/user-welcomed.event';
import { AnemicUserPassword, UserPassword } from './user-password.value-object';

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string; // Use value object
  password: UserPassword;
}

interface UserProps extends UserData {
  id: UniqueId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnemicUser extends Omit<UserProps, 'id' | 'password'> {
  id: string;
  password: AnemicUserPassword;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.createdAt;
  }

  private update() {
    this.props.updatedAt = new Date();
  }

  toAnemic(): AnemicUser {
    return {
      id: this.props.id.toString(),
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      username: this.props.username,
      email: this.props.email,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      password: this.props.password.toAnemic(),
    };
  }

  setData(data: Partial<Omit<UserData, 'password'>>): void {
    data.firstName && (this.props.firstName = data.firstName);
    data.lastName && (this.props.lastName = data.lastName);
    data.username && (this.props.username = data.username);
    data.email && (this.props.email = data.email);
    this.update();
  }

  setPassword(value: string) {
    this.props.password = UserPassword.create({ encrypted: value });
    this.update();
  }

  raiseCreateUser() {
    this.apply(new UserCreatedEvent(this.id.toString()));
  }

  raiseUpdateUser() {
    this.apply(new UserUpdatedEvent(this.id.toString()));
  }

  raiseWelcomeUser() {
    this.apply(new UserWelcomedEvent(this.id.toString()));
  }

  raiseDeleteUser() {
    this.apply(new UserDeletedEvent(this.id.toString()));
  }

  static create(props: UserProps) {
    return new User(props);
  }
}
