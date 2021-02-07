import { UserRepository } from '../../domain/user.repository';
import { User } from 'src/modules/user/domain/user.entity';
import { UserMapper } from '../../domain/user.mapper';
import { UserEntityMemory } from './user.entity';

export class UserRepositoryMemory implements UserRepository {
  private users: UserEntityMemory[] = [];

  constructor(private userMapper: UserMapper<UserEntityMemory>) {}

  async findOneById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return this.userMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    return this.users.map((user) => this.userMapper.toDomain(user));
  }

  async save(user: User): Promise<void> {
    this.users.push(this.userMapper.toPersistence(user));
  }

  async saveAll(users: User[]): Promise<void> {
    const persistenceEntities = users.map((user) =>
      this.userMapper.toPersistence(user),
    );
    this.users.push(...persistenceEntities);
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => id !== user.id);
  }
}
