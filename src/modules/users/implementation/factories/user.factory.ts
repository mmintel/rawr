import { IUserFactory } from '../../domain/users.factory';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export class UserFactory implements IUserFactory {
  create(payload: CreateUserDto) {
    const user = new User();
    // TODO basically implement repository.create from typeorm
    user.email = payload.email;
    return user;
  }
}
