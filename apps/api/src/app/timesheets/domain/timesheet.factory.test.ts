import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetFactory } from './timesheet.factory';
import { EventPublisher } from '@nestjs/cqrs';

describe('TimesheetFactory', () => {
  let timesheetFactory: TimesheetFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimesheetFactory,
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    timesheetFactory = module.get<TimesheetFactory>(TimesheetFactory);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  describe('createTimesheet', () => {
    it('should create a new Timesheet with the provided properties', () => {
      // Arrange
      const props = {
        id: '1',
        grossPayroll: 1000,
        status: 'pending',
        payPeriodStart: new Date().toISOString(),
        payPeriodEnd: new Date().toISOString(),
        checkDate: new Date().toISOString(),
        customerId: '123',
        timesheetEntries: [],
      };

      // Act
      timesheetFactory.createTimesheet(props);

      // Assert
      expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          grossPayroll: props.grossPayroll,
          status: props.status,
          payPeriodStart: props.payPeriodStart,
          payPeriodEnd: props.payPeriodEnd,
          checkDate: props.checkDate,
          customerId: props.customerId,
          timesheetEntries: props.timesheetEntries,
        }),
      );
    });
  });

  describe('reconstituteTimesheet', () => {
    it('should reconstitute a Timesheet with the provided properties', () => {
      // Arrange
      const props = {
        id: '1',
        grossPayroll: 1000,
        status: 'pending',
        payPeriodStart: new Date().toISOString(),
        payPeriodEnd: new Date().toISOString(),
        checkDate: new Date().toISOString(),
        notes: 'Some notes',
        customerId: '123',
        timesheetEntries: [],
      };

      // Act
      timesheetFactory.reconstituteTimesheet(props);

      // Assert
      expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          grossPayroll: props.grossPayroll,
          status: props.status,
          payPeriodStart: props.payPeriodStart,
          payPeriodEnd: props.payPeriodEnd,
          checkDate: props.checkDate,
          notes: props.notes,
          customerId: props.customerId,
          timesheetEntries: props.timesheetEntries,
        }),
      );
    });
  });
});
