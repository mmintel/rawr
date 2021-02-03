import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

export abstract class UserRepository {
  abstract findOneById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;

  abstract createUser(id: string, payload: CreateUserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, payload: UpdateUserDto): Promise<void>;
}
