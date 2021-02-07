import { User } from './user.entity';

export abstract class UserRepository {
  abstract findOneById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;

  abstract save(user: User): Promise<void>;
  abstract saveAll(users: User[]): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
