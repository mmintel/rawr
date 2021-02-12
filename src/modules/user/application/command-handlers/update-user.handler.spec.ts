import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { UserFactory } from '../../domain/users.factory';
import { UpdateUserHandler } from './update-user.handler';
import { User } from '../../domain/user.entity';
import { UpdateUserCommand } from '../../domain/commands/update-user.command';

describe('UpdateUserCommandHandler', () => {
  let userRepository: UserRepository;
  let eventPublisher: EventPublisher;
  let updateUserCommandHandler: UpdateUserHandler;

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
      UpdateUserHandler,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    userRepository = testModule.get(UserRepository);
    eventPublisher = testModule.get(EventPublisher);
    updateUserCommandHandler = testModule.get(UpdateUserHandler);
  });

  describe('execute', () => {
    it('should return Promise<void>', async () => {
      const id = '123';
      const data = { firstName: 'foo' };
      const command = new UpdateUserCommand(id, data);

      const user = {} as User;
      user.raiseUpdateUser = jest.fn();
      user.update = jest.fn();
      user.commit = jest.fn().mockReturnValue(undefined);

      userRepository.findOneById = jest.fn().mockResolvedValue(user);
      userRepository.save = jest.fn().mockResolvedValue(undefined);
      eventPublisher.mergeObjectContext = jest.fn().mockReturnValue(user);

      expect(userRepository.save).toHaveBeenCalledTimes(0);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(0);
      expect(user.raiseUpdateUser).toBeCalledTimes(0);
      expect(user.update).toBeCalledTimes(0);

      await expect(updateUserCommandHandler.execute(command)).resolves.toEqual(
        undefined,
      );

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneById).toHaveBeenCalledWith(id);
      expect(user.raiseUpdateUser).toBeCalledTimes(1);
      expect(user.update).toBeCalledTimes(1);
      expect(user.update).toBeCalledWith(data);
    });
  });
});
