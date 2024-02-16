import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { UpdateTimesheetStatusCommand } from './update-timesheet-status.command';
import { UpdateTimesheetStatusCommandHandler } from './update-timesheet-status.handler';
import { TimesheetRepository } from '../../../domain/timesheet.repository';
import { InjectionToken } from '../../constants';
import { Timesheet } from '../../../domain/timesheet';

describe('UpdateTimesheetStatusCommandHandler', () => {
  let handler: ICommandHandler<UpdateTimesheetStatusCommand, void>;
  let repository: TimesheetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTimesheetStatusCommandHandler,
        {
          provide: InjectionToken.TIMESHEET_REPOSITORY,
          useValue: {
            findById: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<UpdateTimesheetStatusCommandHandler>(
      UpdateTimesheetStatusCommandHandler,
    );
    repository = module.get<TimesheetRepository>(
      InjectionToken.TIMESHEET_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should update timesheet status', async () => {
      const timesheetId = '123';
      const status = 'COMPLETED';

      const command = new UpdateTimesheetStatusCommand(timesheetId, status);

      const timesheet = {
        id: timesheetId,
      } as unknown as Timesheet;

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(timesheet);

      await handler.execute(command);

      expect(repository.findById).toHaveBeenCalledWith(timesheetId);
      expect(repository.updateStatus).toHaveBeenCalledWith(timesheetId, status);
    });

    it('should throw NotFoundException if timesheet is not found', async () => {
      const timesheetId = '123';
      const status = 'COMPLETED';

      const command = new UpdateTimesheetStatusCommand(timesheetId, status);

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(handler.execute(command)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
