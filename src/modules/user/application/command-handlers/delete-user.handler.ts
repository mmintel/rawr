import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../../domain/commands/delete-user.command';
import { UserRepository } from '../../domain/user.repository';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private repository: UserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const { id } = command;
    const entity = await this.repository.findOneById(id);

    if (!entity) {
      throw new UserNotFoundException();
    }

    const user = this.publisher.mergeObjectContext(entity);

    await this.repository.delete(id);

    user.raiseDeleteUser();
    user.commit();
  }
}
