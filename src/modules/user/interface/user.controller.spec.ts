import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserCommand } from '../domain/commands/create-user.command';

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
