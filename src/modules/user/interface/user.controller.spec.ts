import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserCommand } from '../domain/commands/create-user.command';
import { ListUsersQuery } from '../domain/queries/list-users.query';
import { GetUserQuery } from '../domain/queries/get-user.query';
import { UpdateUserCommand } from '../domain/commands/update-user.command';
import { DeleteUserCommand } from '../domain/commands/delete-user.command';

describe('UserController', () => {
  let commandBus: CommandBus;
  let queryBus: QueryBus;
  let userController: UserController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [CommandBus, QueryBus],
    }).compile();

    commandBus = moduleRef.get<CommandBus>(CommandBus);
    commandBus.execute = jest.fn();

    queryBus = moduleRef.get<QueryBus>(QueryBus);
    queryBus.execute = jest.fn();

    userController = moduleRef.get<UserController>(UserController);
  });

  describe('create user', () => {
    it('should execute the CreateUserCommand', async () => {
      const user: CreateUserDto = {
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.baz',
        password: '1234',
      };

      expect(commandBus.execute).toHaveBeenCalledTimes(0);

      await userController.create(user);

      expect(commandBus.execute).toHaveBeenCalledTimes(1);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateUserCommand(user),
      );
    });
  });

  describe('find all', () => {
    it('should execute the ListUsersQuery', async () => {
      expect(queryBus.execute).toHaveBeenCalledTimes(0);

      await userController.findAll();

      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(new ListUsersQuery());
    });
  });

  describe('find one', () => {
    it('should execute the GetUserQuery', async () => {
      const id = '2112asdjni124';
      expect(queryBus.execute).toHaveBeenCalledTimes(0);

      await userController.findOne(id);

      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(new GetUserQuery(id));
    });
  });

  describe('update', () => {
    it('should execute the UpdateUserCommand', async () => {
      const id = '2112asdjni124';
      const payload = { firstName: 'foo' };
      expect(queryBus.execute).toHaveBeenCalledTimes(0);

      await userController.findOne(id);

      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(
        new UpdateUserCommand(id, payload),
      );
    });
  });

  describe('delete', () => {
    it('should execute the DeleteUserCommand', async () => {
      const id = '2112asdjni124';
      expect(queryBus.execute).toHaveBeenCalledTimes(0);

      await userController.findOne(id);

      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(new DeleteUserCommand(id));
    });
  });
});
