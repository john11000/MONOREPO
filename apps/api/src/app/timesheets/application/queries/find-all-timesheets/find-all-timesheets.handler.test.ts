import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTimesheetsQueryHandler } from './find-all-timesheets.handler';
import { FindAllTimesheetsQuery } from './find-all-timesheets.query';
import { FindAllTimesheetsResult } from './find-all-timesheets.result';
import { TimesheetRepository } from '../../../domain/timesheet.repository';
import { InjectionToken } from '../../constants';
import { Timesheet } from '../../../domain/timesheet';

describe('FindAllTimesheetsQueryHandler', () => {
  let handler: FindAllTimesheetsQueryHandler;
  let timesheetRepository: TimesheetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTimesheetsQueryHandler,
        {
          provide: InjectionToken.TIMESHEET_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<FindAllTimesheetsQueryHandler>(
      FindAllTimesheetsQueryHandler,
    );
    timesheetRepository = module.get<TimesheetRepository>(
      InjectionToken.TIMESHEET_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should return all timesheets for the given customer ID', async () => {
      // Arrange
      const query = new FindAllTimesheetsQuery('123');

      const payPeriodStart = new Date().toISOString();
      const payPeriodEnd = new Date().toISOString();
      const checkDate = new Date().toISOString();

      const timesheets: Timesheet[] = [
        {
          getId: () => '1',
          getPayPeriodStart: () => payPeriodStart,
          getPayPeriodEnd: () => payPeriodEnd,
          getGrossPayroll: () => 1000,
          getNotes: () => '',
          getCheckDate: () => checkDate,
          getStatus: () => 'pending',
          getCustomerId: () => '123',
          getTimesheetEntries: () => [],
          commit: jest.fn(),
          createdSuccessfully: jest.fn(),
        },
        // Add more timesheets as needed
      ];
      jest.spyOn(timesheetRepository, 'findAll').mockResolvedValue(timesheets);

      // Act
      const result = await handler.execute(query);

      // Assert
      expect(timesheetRepository.findAll).toHaveBeenCalledWith(
        query.customerId,
      );
      expect(result).toEqual(
        new FindAllTimesheetsResult([
          {
            id: timesheets[0].getId(),
            payPeriodStart: timesheets[0].getPayPeriodStart(),
            payPeriodEnd: timesheets[0].getPayPeriodEnd(),
            grossPayroll: timesheets[0].getGrossPayroll(),
            notes: timesheets[0].getNotes(),
            checkDate: timesheets[0].getCheckDate(),
            status: timesheets[0].getStatus(),
            customerId: timesheets[0].getCustomerId(),
            timesheetEntries: timesheets[0].getTimesheetEntries(),
          },
          // Add more expected results based on the timesheets array
        ]),
      );
    });
  });
});
