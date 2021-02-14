import { AnemicUser, User } from 'src/modules/user/domain/user.entity';
import { UserFactory } from 'src/modules/user/domain/user.factory';
import { UserDTO } from './user.dto';
import { Mapper } from 'src/core/mapper';

export abstract class UserMapper<Persistence = any>
  implements Mapper<User, AnemicUser, Persistence> {
  constructor(private userFactory: UserFactory) {}

  toDTO(user: User): UserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...dto } = this.toAnemic(user);
    return {
      ...dto,
      id: id.value,
    };
  }

  toAnemic(user: User): AnemicUser {
    return user.toAnemic();
  }

  toDomain(anemic: AnemicUser): User {
    return this.userFactory.reconstitute(anemic);
  }

  abstract toPersistence(user: User): Persistence;
  abstract fromPersistence(user: Persistence): User;
}
