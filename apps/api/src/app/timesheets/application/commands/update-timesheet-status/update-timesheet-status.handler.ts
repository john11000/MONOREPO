import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateTimesheetStatusCommand } from './update-timesheet-status.command';
import { InjectionToken } from '../../constants';

import { TimesheetRepository } from '../../../domain/timesheet.repository';

@CommandHandler(UpdateTimesheetStatusCommand)
export class UpdateTimesheetStatusCommandHandler
  implements ICommandHandler<UpdateTimesheetStatusCommand, void>
{
  constructor(
    @Inject(InjectionToken.TIMESHEET_REPOSITORY)
    private readonly timesheetRepository: TimesheetRepository,
  ) {}

  async execute(command: UpdateTimesheetStatusCommand) {
    const timesheet = await this.timesheetRepository.findById(
      command.timesheetId,
    );

    if (!timesheet) {
      throw new NotFoundException('Timesheet not found');
    }

    await this.timesheetRepository.updateStatus(
      command.timesheetId,
      command.status,
    );
  }
}
