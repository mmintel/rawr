import { Factory } from 'src/core/factory';
import { IdGenerator } from 'src/shared/ports/id-generator';
import { UserPassword } from './user-password.value-object';
import { AnemicUser, User } from './user.entity';

interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserFactory implements Factory<User, AnemicUser> {
  constructor(private idGenerator: IdGenerator) {}

  create(props: CreateUserProps): User {
    const now = new Date();

    return new User({
      id: this.idGenerator.generateId(),
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      createdAt: now,
      updatedAt: now,
      password: UserPassword.create({
        value: props.password,
      }),
    });
  }

  reconstitute(anemic: AnemicUser): User {
    return new User({
      id: anemic.id,
      email: anemic.email,
      firstName: anemic.firstName,
      lastName: anemic.lastName,
      createdAt: anemic.createdAt,
      updatedAt: anemic.updatedAt,
      password: UserPassword.create({
        value: anemic.password,
      }),
    });
  }
}
