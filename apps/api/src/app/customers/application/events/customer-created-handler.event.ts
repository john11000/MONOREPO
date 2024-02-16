import { IEventHandler, EventsHandler } from '@nestjs/cqrs';

import { CustomerCreatedEvent } from '../../domain/events/customer-created.event';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedEventHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent) {
    console.log('CustomerCreatedEvent', event);
  }
}
