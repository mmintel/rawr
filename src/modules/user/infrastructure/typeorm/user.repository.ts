import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from 'src/modules/user/domain/user.entity';
import { UserMapper } from 'src/modules/user/domain/user.mapper';
import { UserRepository } from '../../domain/user.repository';
import { UserEntityTypeORM } from './user.entity';

@EntityRepository(UserEntityTypeORM)
export class UserRepositoryTypeORM implements UserRepository {
  private repository: Repository<UserEntityTypeORM>;

  constructor(private userMapper: UserMapper<UserEntityTypeORM>) {
    this.repository = getRepository<UserEntityTypeORM>(UserEntityTypeORM);
  }

  async findAll() {
    const entities = await this.repository.find();
    return entities.map((entity) => this.userMapper.toDomain(entity));
  }

  async findOneById(id) {
    const entity = await this.repository.findOne(id);
    return this.userMapper.toDomain(entity);
  }

  async save(user: User) {
    const persistenceEntity = this.userMapper.toPersistence(user);
    await this.repository.save(persistenceEntity);
  }

  async saveAll(users: User[]) {
    const persistenceEntities = users.map((user) =>
      this.userMapper.toPersistence(user),
    );
    await this.repository.save(persistenceEntities);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
