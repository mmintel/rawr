import { UserCreatedHandler } from './user-created/user-created.handler';
import { UserWelcomedHandler } from './user-welcomed/user-welcomed.handler';
import { UserDeletedHandler } from './user-deleted/user-deleted.handler';
import { UserUpdatedHandler } from './user-updated/user-updated.handler';

export const EventHandlers = [
  UserCreatedHandler,
  UserWelcomedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
];
