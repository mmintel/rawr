import { User } from 'src/modules/user/domain/user.entity';
import { UserMapper } from 'src/modules/user/domain/user.mapper';
import { UserEntityMemory } from './user.entity';

export class UserMapperMemory extends UserMapper<UserEntityMemory> {
  toPersistence(user: User): UserEntityMemory {
    return this.toAnemic(user);
  }
}
