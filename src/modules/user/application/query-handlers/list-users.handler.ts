import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { ListUsersQuery } from '../../domain/queries/list-users.query';
import { UserMapper } from '../../domain/user.mapper';
import { UserDTO } from '../../domain/user.dto';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private repository: UserRepository, private mapper: UserMapper) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.repository.findAll();
    return users.map((u) => this.mapper.toDTO(u));
  }
}
