import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CreatedEmployeeEvent } from '../../domain/events/created-employee.event';

@EventsHandler(CreatedEmployeeEvent)
export class CreatedEmployeeEventHandler
  implements IEventHandler<CreatedEmployeeEvent>
{
  async handle(event: CreatedEmployeeEvent) {
    console.log('CreatedEmployeeEvent', event);
  }
}
