import { IEvent } from '@nestjs/cqrs';

export class CustomerCreatedEvent implements IEvent {
  constructor(readonly email: string) {}
}
