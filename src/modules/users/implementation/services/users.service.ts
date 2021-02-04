import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user/create-user.command';
import { UpdateUserCommand } from '../application/commands/update-user/update-user.command';
import { DeleteUserCommand } from '../application/commands/delete-user/delete-user.command';
import { ListUsersQuery } from '../application/queries/list-users/list-users.query';
import { GetUserQuery } from '../../application/queries/get-user/get-user.query';
import { IUserService } from '../../domain/users.service';

export class UsersService implements IUserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(payload: CreateUserDto) {
    await this.commandBus.execute(new CreateUserCommand(payload));
  }

  async findAll() {
    return this.queryBus.execute(new ListUsersQuery());
  }

  async findOne(id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
  }

  async remove(id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
