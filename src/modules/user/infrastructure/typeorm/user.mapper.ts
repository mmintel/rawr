import { Injectable } from '@nestjs/common';
import { UniqueId } from 'src/core/unique-id.value-object';
import { User } from 'src/modules/user/domain/user.entity';
import { UserMapper } from 'src/modules/user/domain/user.mapper';
import { UserPassword } from '../../domain/user-password.value-object';
import { UserEntityTypeORM } from './user.entity';

@Injectable()
export class UserMapperTypeORM extends UserMapper<UserEntityTypeORM> {
  toPersistence(user: User): UserEntityTypeORM {
    return new UserEntityTypeORM(user.toAnemic());
  }

  fromPersistence(entity: UserEntityTypeORM): User {
    return User.create({
      id: UniqueId.create({ value: entity.id }),
      firstName: entity.firstName,
      lastName: entity.lastName,
      username: entity.username,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      password: UserPassword.create(entity.password),
    });
  }
}
