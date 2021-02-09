import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { User } from 'src/modules/user/domain/user.entity';
import { ListUsersQuery } from '../../domain/queries/list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.findAll();
  }
}
