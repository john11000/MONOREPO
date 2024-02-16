import { IEvent } from '@nestjs/cqrs';

export class TimesheetCreatedEvent implements IEvent {
  constructor(readonly customerId: string) {}
}
