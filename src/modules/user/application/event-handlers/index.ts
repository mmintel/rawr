import { UserCreatedHandler } from './user-created.handler';
import { UserWelcomedHandler } from './user-welcomed.handler';
import { UserDeletedHandler } from './user-deleted.handler';
import { UserUpdatedHandler } from './user-updated.handler';

export const EventHandlers = [
  UserCreatedHandler,
  UserWelcomedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
];
