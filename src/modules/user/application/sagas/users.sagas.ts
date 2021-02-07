import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { WelcomeUserCommand } from '../commands/welcome-user/welcome-user.command';
import { delay, map } from 'rxjs/operators';
import * as clc from 'cli-color';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map((event) => {
        console.log(clc.redBright('Execute UserCreatedSaga, sending mail...'));
        return new WelcomeUserCommand(event.userId);
      }),
    );
  };
}
