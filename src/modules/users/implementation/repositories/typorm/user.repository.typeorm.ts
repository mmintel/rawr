import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../../domain/user.repository';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';

@EntityRepository(User)
export class UserRepositoryTypeORM implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository<User>(User);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOneById(id) {
    return this.repository.findOne(id);
  }

  async save(user: User) {
    await this.repository.save(user);
  }

  async create(payload: CreateUserDto) {
    return this.repository.create(payload);
  }

  async update(id: string, payload: UpdateUserDto) {
    await this.repository.update(id, payload);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
