import { Factory } from 'src/core/factory';
import { UserPassword } from './user-password.value-object';
import { AnemicUser, User } from './user.entity';

interface CreateUserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserFactory implements Factory<User, AnemicUser> {
  create(props: CreateUserProps): User {
    const now = new Date();
    return new User({
      id: props.id,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      createdAt: now,
      updatedAt: now,
      password: UserPassword.create(props.password),
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
      password: UserPassword.create(anemic.password),
    });
  }
}
