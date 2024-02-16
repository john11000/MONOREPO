import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserLoggedInEvent } from '../../../domain/events/user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInEventHandler
  implements IEventHandler<UserLoggedInEvent>
{
  async handle(event: UserLoggedInEvent) {
    console.log('UserLoggedInEvent', event);
  }
}
