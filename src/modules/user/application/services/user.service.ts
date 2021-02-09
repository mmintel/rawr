import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../../interface/dtos/create-user.dto';
import { UpdateUserDto } from '../../interface/dtos/update-user.dto';
import { CreateUserCommand } from '../../domain/commands/create-user.command';
import { UpdateUserCommand } from '../../domain/commands/update-user.command';
import { DeleteUserCommand } from '../../domain/commands/delete-user.command';
import { ListUsersQuery } from '../../domain/queries/list-users.query';
import { GetUserQuery } from '../../domain/queries/get-user.query';

export class UserApplicationService {
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
