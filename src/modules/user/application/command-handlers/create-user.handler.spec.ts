import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { UserFactory } from '../../domain/users.factory';
import { CreateUserHandler } from './create-user.handler';
import { User } from '../../domain/user.entity';
import { CreateUserCommand } from '../../domain/commands/create-user.command';

describe('CreateUserCommandHandler', () => {
  let userRepository: UserRepository;
  let userFactory: UserFactory;
  let eventPublisher: EventPublisher;
  let createUserCommandHandler: CreateUserHandler;

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
      CreateUserHandler,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    userRepository = testModule.get(UserRepository);
    userFactory = testModule.get(UserFactory);
    eventPublisher = testModule.get(EventPublisher);
    createUserCommandHandler = testModule.get(CreateUserHandler);
  });

  describe('execute', () => {
    it('should return Promise<void>', async () => {
      const command = new CreateUserCommand({
        email: 'foo@foo.de',
        firstName: 'Foo',
        lastName: 'Bar',
        password: '1234',
      });

      const user = {} as User;
      user.raiseCreateUser = jest.fn();
      user.commit = jest.fn().mockReturnValue(undefined);

      userFactory.create = jest.fn().mockReturnValue(user);
      eventPublisher.mergeObjectContext = jest.fn().mockReturnValue(user);
      userRepository.save = jest.fn().mockResolvedValue(undefined);

      await expect(createUserCommandHandler.execute(command)).resolves.toEqual(
        undefined,
      );
    });
  });
});
