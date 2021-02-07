import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { WelcomeUserCommand } from './welcome-user.command';
import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(WelcomeUserCommand)
export class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: WelcomeUserCommand, resolve: (value?) => void) {
    const { userId } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.welcomeUser({ userId }),
    );
    user.commit();
    resolve();
  }
}
