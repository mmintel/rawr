import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../../../domain/user.repository';

@EntityRepository(User)
export class UserRepository implements UserRepository {
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

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
