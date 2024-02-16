import { Test, TestingModule } from '@nestjs/testing';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateTimesheetCommand } from './create-timesheet.command';
import { CreateTimesheetCommandHandler } from './create-timesheet.handler';
import { TimesheetRepository } from '../../../domain/timesheet.repository';
import { TimesheetFactory } from '../../../domain/timesheet.factory';
import { InjectionToken } from '../../constants';
import { TimesheetStatus } from '../../../domain/constants/status.constant';
import { Timesheet } from '../../../domain/timesheet';

describe('CreateTimesheetCommandHandler', () => {
  let handler: ICommandHandler<CreateTimesheetCommand, void>;
  let repository: TimesheetRepository;
  let factory: TimesheetFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTimesheetCommandHandler,
        {
          provide: InjectionToken.TIMESHEET_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: TimesheetFactory,
          useValue: {
            createTimesheet: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateTimesheetCommandHandler>(
      CreateTimesheetCommandHandler,
    );
    repository = module.get<TimesheetRepository>(
      InjectionToken.TIMESHEET_REPOSITORY,
    );
    factory = module.get<TimesheetFactory>(TimesheetFactory);
  });

  describe('execute', () => {
    it('should create a timesheet', async () => {
      const command = new CreateTimesheetCommand(
        new Date().toISOString(),
        new Date().toISOString(),
        new Date().toISOString(),
        '123',
        [],
      );

      const timesheet = {
        commit: jest.fn(),
        createdSuccessfully: jest.fn(),
      } as unknown as Timesheet;

      jest.spyOn(factory, 'createTimesheet').mockReturnValueOnce(timesheet);

      await handler.execute(command);

      expect(factory.createTimesheet).toHaveBeenCalledWith({
        id: expect.any(String),
        grossPayroll: expect.any(Number),
        status: TimesheetStatus.PENDING,
        payPeriodStart: command.payPeriodStart,
        payPeriodEnd: command.payPeriodEnd,
        checkDate: command.checkDate,
        customerId: command.customerId,
        timesheetEntries: command.entries,
      });

      expect(repository.save).toHaveBeenCalledWith(timesheet);
      expect(timesheet.createdSuccessfully).toHaveBeenCalled();
      expect(timesheet.commit).toHaveBeenCalled();
    });
  });
});
