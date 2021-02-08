import { CreateUserHandler } from './create-user/create-user.handler';
import { DeleteUserHandler } from './delete-user/delete-user.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';
import { WelcomeUserHandler } from './welcome-user/welcome-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  WelcomeUserHandler,
];
