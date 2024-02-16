import { IEvent } from '@nestjs/cqrs';

export class CreatedEmployeeEvent implements IEvent {
  constructor(readonly name: string) {}
}
