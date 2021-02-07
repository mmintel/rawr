import { User } from './user.entity';

export interface UserRepository {
  findOneById(id: string): Promise<User>;
  findAll(): Promise<User[]>;

  save(user: User): Promise<void>;
  saveAll(users: User[]): Promise<void>;
  delete(id: string): Promise<void>;
}
