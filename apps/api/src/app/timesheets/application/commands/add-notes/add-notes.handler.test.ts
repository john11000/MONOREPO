import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AddNotesCommand } from './add-notes.command';
import { AddNotesCommandHandler } from './add-notes.handler';
import { TimesheetRepository } from '../../../domain/timesheet.repository';
import { InjectionToken } from '../../constants';
import { Timesheet } from '../../../domain/timesheet';

describe('AddNotesCommandHandler', () => {
  let handler: AddNotesCommandHandler;
  let timesheetRepository: TimesheetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddNotesCommandHandler,
        {
          provide: InjectionToken.TIMESHEET_REPOSITORY,
          useValue: {
            findById: jest.fn(),
            addNotes: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<AddNotesCommandHandler>(AddNotesCommandHandler);
    timesheetRepository = module.get<TimesheetRepository>(
      InjectionToken.TIMESHEET_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should add notes to the timesheet', async () => {
      const timesheetId = '1';
      const notes = 'Sample notes';

      const timesheet = { id: timesheetId } as unknown as Timesheet;

      jest.spyOn(timesheetRepository, 'findById').mockResolvedValue(timesheet);

      await handler.execute(new AddNotesCommand(timesheetId, notes));

      expect(timesheetRepository.findById).toHaveBeenCalledWith(timesheetId);
      expect(timesheetRepository.addNotes).toHaveBeenCalledWith(
        timesheetId,
        notes,
      );
    });

    it('should throw NotFoundException if timesheet is not found', async () => {
      const timesheetId = '1';
      const notes = 'Sample notes';

      jest.spyOn(timesheetRepository, 'findById').mockResolvedValue(null);

      await expect(
        handler.execute(new AddNotesCommand(timesheetId, notes)),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
