import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    Logger.log(event, 'UserCreatedEvent');
  }
}
