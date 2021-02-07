import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../../../domain/user.repository';
import { User } from 'src/modules/user/domain/user.entity';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private repository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.repository.findOneById(query.id);
  }
}
