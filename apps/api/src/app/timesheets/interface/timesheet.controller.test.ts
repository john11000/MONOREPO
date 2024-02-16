import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TimesheetController } from './timesheet.controller';
import {
  AddNoteRequestDto,
  CreateTimesheetRequestDto,
  UpdateTimesheetStatusRequestDto,
} from './dtos/request';
import { CreateTimesheetCommand } from '../application/commands/create-timesheet/create-timesheet.command';
import { Payload } from '../../auth/interface/types';
import { FindAllTimesheetsResponseDto } from './dtos/response';
import { FindAllTimesheetsQuery } from '../application/queries/find-all-timesheets/find-all-timesheets.query';
import { UpdateTimesheetStatusCommand } from '../application/commands/update-timesheet-status/update-timesheet-status.command';
import { AddNotesCommand } from '../application/commands/add-notes/add-notes.command';

describe('TimesheetController', () => {
  let controller: TimesheetController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetController],
      providers: [CommandBus, QueryBus],
    }).compile();

    controller = module.get<TimesheetController>(TimesheetController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('createTimesheet', () => {
    it('should create a new timesheet', async () => {
      const createTimesheetRequestDto: CreateTimesheetRequestDto = {
        checkDate: '',
        payPeriodStart: '',
        payPeriodEnd: '',
        entries: [],
      };

      const req = { user: { customerId: 'customer' } } as Request & {
        user: Payload;
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce({});

      await controller.createTimesheet(createTimesheetRequestDto, req);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateTimesheetCommand(
          req.user.customerId,
          createTimesheetRequestDto.checkDate,
          createTimesheetRequestDto.payPeriodStart,
          createTimesheetRequestDto.payPeriodEnd,
          createTimesheetRequestDto.entries,
        ),
      );
    });
  });

  describe('findAllTimesheets', () => {
    it('should return all timesheets', async () => {
      const req = { user: { role: 'customer' } } as Request & { user: Payload };

      const findAllTimesheetsResponseDto: FindAllTimesheetsResponseDto = {
        timesheets: [], // Initialize the timesheets property
      };

      const customerId = req.user.customerId;

      jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValueOnce(findAllTimesheetsResponseDto);

      const result = await controller.findAllTimesheets(req);

      expect(queryBus.execute).toHaveBeenCalledWith(
        new FindAllTimesheetsQuery(customerId),
      );
      expect(result).toEqual(findAllTimesheetsResponseDto);
    });
  });

  describe('updateTimesheetStatus', () => {
    it('should update the status of a timesheet', async () => {
      const id = 'timesheetId';

      const updateTimesheetStatusRequestDto: UpdateTimesheetStatusRequestDto = {
        status: '',
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce({});

      await controller.updateTimesheetStatus(
        id,
        updateTimesheetStatusRequestDto,
      );

      expect(commandBus.execute).toHaveBeenCalledWith(
        new UpdateTimesheetStatusCommand(
          id,
          updateTimesheetStatusRequestDto.status,
        ),
      );
    });
  });

  describe('addNote', () => {
    it('should add a note to a timesheet', async () => {
      const id = 'timesheetId';
      const addNotesRequestDto: AddNoteRequestDto = {
        notes: '',
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce({});

      await controller.addNote(id, addNotesRequestDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new AddNotesCommand(id, addNotesRequestDto.notes),
      );
    });
  });
});
