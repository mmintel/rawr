import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserDeletedEvent } from '../../../domain/events/user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  handle(event: UserDeletedEvent) {
    Logger.log(event, 'UserDeletedEvent');
  }
}
