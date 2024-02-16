import { TimesheetCreatedEvent } from '../../domain/events/timesheet-created.event';
import { TimesheetCreatedEventHandler } from './timesheet-created-handler.event';

describe('TimesheetCreatedEventHandler', () => {
  let handler: TimesheetCreatedEventHandler;

  beforeEach(() => {
    handler = new TimesheetCreatedEventHandler();
  });

  it('should handle the TimesheetCreatedEvent', () => {
    const event: TimesheetCreatedEvent = {
      customerId: '12312',
    };

    const consoleSpy = jest.spyOn(console, 'log');

    handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith('TimesheetCreatedEvent', event);
  });
});
