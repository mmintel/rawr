import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created/user-created.event';
import { WelcomeUserCommand } from '../commands/welcome-user/welcome-user.command';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map((event) => {
        return new WelcomeUserCommand(event.userId);
      }),
    );
  };
}
