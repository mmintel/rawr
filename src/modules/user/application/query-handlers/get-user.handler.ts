import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../../domain/queries/get-user.query';
import { UserRepository } from '../../domain/user.repository';
import { UserMapper } from '../../domain/user.mapper';
import { UserDTO } from '../../domain/user.dto';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private repository: UserRepository, private mapper: UserMapper) {}

  async execute(query: GetUserQuery): Promise<UserDTO> {
    const user = await this.repository.findOneById(query.id);
    return this.mapper.toDTO(user);
  }
}
