import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user.entity';
import { UserMapper } from 'src/modules/user/domain/user.mapper';
import { UserEntityTypeORM } from './user.entity';

@Injectable()
export class UserMapperTypeORM extends UserMapper<UserEntityTypeORM> {
  toPersistence(user: User): UserEntityTypeORM {
    // TODO should password be converted to string or should TypeOrm entity make use of anemic password structure?
    return new UserEntityTypeORM(user.toAnemic());
  }
}
