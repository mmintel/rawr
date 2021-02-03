import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UserRepository } from '../user.repository';

export class UserRepositoryMemoryAdapter extends UserRepository {
  private users = [];

  async findOneById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async createUser(id: string, payload: CreateUserDto): Promise<void> {
    const { title, author } = payload;
    this.users.push(new User(id, title, author));
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((book) => id !== book.id);
  }

  async update(id: string, payload: UpdateUserDto): Promise<void> {
    const { title, author } = payload;
    this.users = this.users.filter((book) => id !== book.id);
    this.users.push(new User(id, title, author));
  }
}
