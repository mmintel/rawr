import { AnemicUser, User } from 'src/modules/user/domain/user.entity';
import { UserFactory } from 'src/modules/user/domain/users.factory';
import { UserDTO } from './user.dto';

interface Mapper<Domain, Anemic, Persistence> {
  toAnemic(domain: Domain): Anemic;
  toDomain(raw: any): Domain;
  toPersistence(domain: Domain): Persistence;
}

export abstract class UserMapper<Entity>
  implements Mapper<User, AnemicUser, Entity> {
  constructor(private userFactory: UserFactory) {}

  toDTO(user: User): UserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...dto } = this.toAnemic(user);
    return dto;
  }

  toAnemic(user: User): AnemicUser {
    return user.toAnemic();
  }

  toDomain(raw: any): User {
    // TODO make sure raw has right format
    return this.userFactory.reconstitute(raw);
  }

  abstract toPersistence(user: User): Entity;
}
