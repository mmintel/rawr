import { AnemicUser, User } from 'src/modules/user/domain/user.entity';
import { UserFactory } from 'src/modules/user/domain/users.factory';
import { UserDTO } from './user.dto';

interface Mapper<Domain, Anemic, Persistence = any> {
  toAnemic(domain: Domain): Anemic;
  toDomain(raw: any): Domain;
  toPersistence(domain: Domain): Persistence;
}

export abstract class UserMapper<Persistence = any>
  implements Mapper<User, AnemicUser, Persistence> {
  constructor(private userFactory: UserFactory) {}

  toDTO(user: User): UserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, id, createdAt, updatedAt, ...dto } = this.toAnemic(user);
    return {
      ...dto,
      id: id.value,
    };
  }

  toAnemic(user: User): AnemicUser {
    return user.toAnemic();
  }

  toDomain(raw: any): User {
    // TODO make sure raw has right format
    return this.userFactory.reconstitute(raw);
  }

  abstract toPersistence(user: User): Persistence;
}
