import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { UserFactory } from '../../domain/users.factory';
import { WelcomeUserHandler } from './welcome-user.handler';
import { User } from '../../domain/user.entity';
import { WelcomeUserCommand } from '../../domain/commands/welcome-user.command';

describe('WelcomeUserCommandHandler', () => {
  let userRepository: UserRepository;
  let eventPublisher: EventPublisher;
  let welcomeUserCommandHandler: WelcomeUserHandler;

  beforeEach(async () => {
    const userFactoryProvider: Provider = {
      provide: UserFactory,
      useValue: {},
    };
    const userRepositoryProvider: Provider = {
      provide: UserRepository,
      useValue: {},
    };
    const eventPublisherProvider: Provider = {
      provide: EventPublisher,
      useValue: {},
    };

    const providers: Provider[] = [
      userFactoryProvider,
      userRepositoryProvider,
      eventPublisherProvider,
      WelcomeUserHandler,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    userRepository = testModule.get(UserRepository);
    eventPublisher = testModule.get(EventPublisher);
    welcomeUserCommandHandler = testModule.get(WelcomeUserHandler);
  });

  describe('execute', () => {
    it('should return Promise<void>', async () => {
      const id = '123';
      const command = new WelcomeUserCommand(id);

      const user = {} as User;
      user.raiseWelcomeUser = jest.fn();
      user.commit = jest.fn().mockReturnValue(undefined);

      userRepository.findOneById = jest.fn().mockResolvedValue(user);
      eventPublisher.mergeObjectContext = jest.fn().mockReturnValue(user);

      expect(userRepository.findOneById).toHaveBeenCalledTimes(0);
      expect(user.raiseWelcomeUser).toBeCalledTimes(0);

      await expect(welcomeUserCommandHandler.execute(command)).resolves.toEqual(
        undefined,
      );

      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneById).toHaveBeenCalledWith(id);
      expect(user.raiseWelcomeUser).toBeCalledTimes(1);
    });
  });
});
