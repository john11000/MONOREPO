import { CustomerCreatedEvent } from '../../domain/events/customer-created.event';
import { CustomerCreatedEventHandler } from './customer-created-handler.event';

describe('CustomerCreatedEventHandler', () => {
  let handler: CustomerCreatedEventHandler;

  beforeEach(() => {
    handler = new CustomerCreatedEventHandler();
  });

  it('should handle the CustomerCreatedEvent', () => {
    const event: CustomerCreatedEvent = {
      email: 'customer@test.com',
    };

    const consoleSpy = jest.spyOn(console, 'log');

    handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith('CustomerCreatedEvent', event);
  });
});
