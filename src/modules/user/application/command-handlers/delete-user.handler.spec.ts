import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { UserFactory } from '../../domain/users.factory';
import { DeleteUserHandler } from './delete-user.handler';
import { User } from '../../domain/user.entity';
import { DeleteUserCommand } from '../../domain/commands/delete-user.command';

describe('DeleteUserCommandHandler', () => {
  let userRepository: UserRepository;
  let eventPublisher: EventPublisher;
  let deleteUserCommandHandler: DeleteUserHandler;

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
      DeleteUserHandler,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    userRepository = testModule.get(UserRepository);
    eventPublisher = testModule.get(EventPublisher);
    deleteUserCommandHandler = testModule.get(DeleteUserHandler);
  });

  describe('execute', () => {
    it('should return Promise<void>', async () => {
      const id = '123';
      const command = new DeleteUserCommand(id);

      const user = {} as User;
      user.raiseDeleteUser = jest.fn();
      user.commit = jest.fn().mockReturnValue(undefined);

      userRepository.findOneById = jest.fn().mockResolvedValue(user);
      userRepository.delete = jest.fn().mockResolvedValue(undefined);
      eventPublisher.mergeObjectContext = jest.fn().mockReturnValue(user);

      expect(userRepository.delete).toHaveBeenCalledTimes(0);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(0);
      expect(user.raiseDeleteUser).toHaveBeenCalledTimes(0);

      await expect(deleteUserCommandHandler.execute(command)).resolves.toEqual(
        undefined,
      );

      expect(userRepository.delete).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneById).toHaveBeenCalledWith(id);
      expect(user.raiseDeleteUser).toHaveBeenCalledTimes(1);
    });
  });
});
