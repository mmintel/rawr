import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { IUserRepository } from '../../../domain/user.repository';
import { UserFactory } from 'src/modules/users/implementation/factories/user.factory';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private factory: UserFactory,
    private repository: IUserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { payload } = command;
    const user = this.publisher.mergeObjectContext(
      this.factory.create(payload),
    );

    await this.repository.save(user);

    user.raiseCreateUser();
    user.commit();
  }
}
