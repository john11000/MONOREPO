import { CreatedEmployeeEvent } from '../../domain/events/created-employee.event';
import { CreatedEmployeeEventHandler } from './created-employee-handler.event';

describe('CreatedEmployeeEventHandler', () => {
  let handler: CreatedEmployeeEventHandler;

  beforeEach(() => {
    handler = new CreatedEmployeeEventHandler();
  });

  it('should handle the CreatedEmployeeEvent', async () => {
    const event: CreatedEmployeeEvent = {
      name: 'John Doe',
    };

    const consoleSpy = jest.spyOn(console, 'log');

    await handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith('CreatedEmployeeEvent', event);
  });
});
