import { AnemicUser, User } from 'src/modules/user/domain/user.entity';
import { UserFactory } from 'src/modules/user/domain/users.factory';

interface Mapper<Domain, Anemic, Persistence> {
  toAnemic(domain: Domain): Anemic;
  toDomain(anemic: Anemic): Domain;
  toPersistence(domain: Domain): Persistence;
}

export abstract class UserMapper<Entity>
  implements Mapper<User, AnemicUser, Entity> {
  constructor(private userFactory: UserFactory) {}

  toAnemic(user: User): AnemicUser {
    return user.toAnemic();
  }

  toDomain(anemic: AnemicUser): User {
    return this.userFactory.reconstitute(anemic);
  }

  abstract toPersistence(user: User): Entity;
}
