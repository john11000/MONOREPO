import { IEventHandler, EventsHandler } from '@nestjs/cqrs';

import { TimesheetCreatedEvent } from '../../domain/events/timesheet-created.event';

@EventsHandler(TimesheetCreatedEvent)
export class TimesheetCreatedEventHandler
  implements IEventHandler<TimesheetCreatedEvent>
{
  handle(event: TimesheetCreatedEvent) {
    console.log('TimesheetCreatedEvent', event);
  }
}
