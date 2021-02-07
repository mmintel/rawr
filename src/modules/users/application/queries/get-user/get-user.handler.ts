import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../../../domain/user.repository';
import { IUser } from 'src/modules/users/domain/user.entity';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private repository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<IUser> {
    return this.repository.findOneById(query.id);
  }
}
