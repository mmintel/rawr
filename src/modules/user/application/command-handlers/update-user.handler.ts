import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../../domain/commands/update-user.command';
import { UserRepository } from '../../domain/user.repository';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private repository: UserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, payload } = command;
    const model = await this.repository.findOneById(id);

    if (!model) throw new UserNotFoundException();

    const user = this.publisher.mergeObjectContext(model);

    user.update(payload);

    await this.repository.save(user);

    user.raiseUpdateUser();
    user.commit();
  }
}
