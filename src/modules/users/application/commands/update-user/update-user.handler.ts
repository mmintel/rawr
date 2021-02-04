import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { IUserRepository } from '../../../domain/user.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class CreateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private repository: IUserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, payload } = command;
    const model = await this.repository.findOneById(id);

    // TODO really raise errors in command?
    if (!model) throw new NotFoundException();

    const user = this.publisher.mergeObjectContext(model);

    await this.repository.save(user);

    user.raiseUpdateUser();
    user.commit();
  }
}
