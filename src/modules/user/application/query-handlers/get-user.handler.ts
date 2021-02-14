import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../../domain/queries/get-user.query';
import { UserRepository } from '../../domain/user.repository';
import { UserMapper } from '../../domain/user.mapper';
import { UserDTO } from '../../domain/user.dto';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private repository: UserRepository, private mapper: UserMapper) {}

  async execute(query: GetUserQuery): Promise<UserDTO> {
    console.log('FINDING USER BY', query.id);

    const users = await this.repository.findAll();
    console.log('HAVE', users[0].id);

    const user = await this.repository.findOneById(query.id);
    return this.mapper.toDTO(user);
  }
}
