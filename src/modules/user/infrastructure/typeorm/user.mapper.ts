import { User } from 'src/modules/user/domain/user.entity';
import { UserMapper } from 'src/modules/user/domain/user.mapper';
import { UserEntityTypeORM } from './user.entity';

export class UserMapperTypeORM extends UserMapper<UserEntityTypeORM> {
  toPersistence(user: User): UserEntityTypeORM {
    return new UserEntityTypeORM(user);
  }
}
