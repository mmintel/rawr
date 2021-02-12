import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { AnemicUser } from 'src/modules/user/domain/user.entity';
import { ListUsersQuery } from '../../domain/queries/list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private repository: UserRepository) {}

  async execute(): Promise<AnemicUser[]> {
    const users = await this.repository.findAll();
    return users.map((u) => u.toAnemic());
  }
}
