import { AnemicUser, User } from 'src/modules/user/domain/user.entity';
import { UserFactory } from 'src/modules/user/domain/user.factory';
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
    const { password, createdAt, updatedAt, ...dto } = this.toAnemic(user);
    return dto;
  }

  toAnemic(user: User): AnemicUser {
    return user.toAnemic();
  }

  toDomain(anemic: AnemicUser): User {
    return this.userFactory.reconstitute(anemic);
  }

  abstract toPersistence(user: User): Persistence;
}
