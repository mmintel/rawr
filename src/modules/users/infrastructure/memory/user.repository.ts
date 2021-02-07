import { UserRepository } from '../../domain/user.repository';
import { IUser } from 'src/modules/users/domain/user.entity';
import { IUpdateUserDTO } from 'src/modules/users/domain/dto/update-user.dto';

export class UserRepositoryMemory extends IUserRepository {
  private users: IUser[] = [];

  async findOneById(id: string): Promise<IUser> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async save(user: IUser): Promise<void> {
    this.users.push(user);
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => id !== user.id);
  }

  async update(id: string, payload: IUpdateUserDTO): Promise<void> {
    this.users = this.users.map((u) =>
      id === u.id ? { ...u, ...payload } : u,
    );
  }
}
