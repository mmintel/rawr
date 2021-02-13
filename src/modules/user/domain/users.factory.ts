import { Factory } from 'src/core/factory';
import { UniqueId } from 'src/core/unique-entity-id';
import { UserPassword } from './user-password.value-object';
import { AnemicUser, User } from './user.entity';

interface CreateUserProps {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class UserFactory implements Factory<User, AnemicUser> {
  create(props: CreateUserProps): User {
    const now = new Date();

    return User.create({
      id: UniqueId.create({ value: props.id }),
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      username: props.username,
      createdAt: now,
      updatedAt: now,
      password: UserPassword.create({
        encrypted: props.password,
      }),
    });
  }

  reconstitute(anemic: AnemicUser): User {
    return User.create({
      id: UniqueId.create({ value: anemic.id.value }),
      email: anemic.email,
      firstName: anemic.firstName,
      lastName: anemic.lastName,
      username: anemic.username,
      createdAt: anemic.createdAt,
      updatedAt: anemic.updatedAt,
      password: UserPassword.create({
        encrypted: anemic.password.encrypted,
        salt: anemic.password.salt,
      }),
    });
  }
}
