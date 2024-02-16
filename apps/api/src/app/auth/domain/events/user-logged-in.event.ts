import { IEvent } from '@nestjs/cqrs';

export class UserLoggedInEvent implements IEvent {
  constructor(readonly email: string) {}
}
