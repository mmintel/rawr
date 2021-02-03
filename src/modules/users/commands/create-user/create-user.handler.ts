import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../repository/user.repository';
import { IdGenerator } from 'src/shared';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private idGenerator: IdGenerator,
    private repository: UserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand, resolve: (value?) => void) {
    const { payload } = command;
    const id = this.idGenerator.generateId();
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(id, payload),
    );

    user.commit();
    resolve();
  }
}
