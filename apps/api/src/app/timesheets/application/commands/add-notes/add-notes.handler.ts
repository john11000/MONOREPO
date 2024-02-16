import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddNotesCommand } from './add-notes.command';
import { InjectionToken } from '../../constants';

import { TimesheetRepository } from '../../../domain/timesheet.repository';

@CommandHandler(AddNotesCommand)
export class AddNotesCommandHandler
  implements ICommandHandler<AddNotesCommand, void>
{
  constructor(
    @Inject(InjectionToken.TIMESHEET_REPOSITORY)
    private readonly timesheetRepository: TimesheetRepository,
  ) {}

  async execute(command: AddNotesCommand) {
    const timesheet = await this.timesheetRepository.findById(
      command.timesheetId,
    );

    if (!timesheet) {
      throw new NotFoundException('Timesheet not found');
    }

    await this.timesheetRepository.addNotes(command.timesheetId, command.notes);
  }
}
