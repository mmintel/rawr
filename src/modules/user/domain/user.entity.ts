import { AggregateRoot } from '@nestjs/cqrs';
import { Entity } from 'src/core/entity';
import { UserCreatedEvent } from './events/user-created.event';
import { UserDeletedEvent } from './events/user-deleted.event';
import { UserUpdatedEvent } from './events/user-updated.event';
import { UserWelcomedEvent } from './events/user-welcomed.event';
import { UserPassword } from './user-password.value-object';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserProps extends UserData {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly password: UserPassword;
}
export interface AnemicUser extends Omit<UserProps, 'password'> {
  password: string;
}

export class User extends AggregateRoot implements Entity<AnemicUser> {
  private readonly id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private password: UserPassword;

  constructor(props: UserProps) {
    super();
    Object.assign(this, props);
  }

  toAnemic(): AnemicUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      password: this.password.value,
    };
  }

  setData(data: Partial<UserData>): void {
    data.firstName && (this.firstName = data.firstName);
    data.lastName && (this.lastName = data.lastName);
    data.email && (this.email = data.email);
  }

  raiseCreateUser() {
    this.apply(new UserCreatedEvent(this.id));
  }

  raiseUpdateUser() {
    this.apply(new UserUpdatedEvent(this.id));
  }

  raiseWelcomeUser() {
    this.apply(new UserWelcomedEvent(this.id));
  }

  raiseDeleteUser() {
    this.apply(new UserDeletedEvent(this.id));
  }
}
