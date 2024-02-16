import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateTimesheetCommand } from './create-timesheet.command';
import { InjectionToken } from '../../constants';

import { TimesheetRepository } from '../../../domain/timesheet.repository';
import { TimesheetFactory } from '../../../domain/timesheet.factory';
import { generateId } from '@ocmi/api/libs/utils';
import { TimesheetStatus } from '../../../domain/constants/status.constant';

@CommandHandler(CreateTimesheetCommand)
export class CreateTimesheetCommandHandler
  implements ICommandHandler<CreateTimesheetCommand, void>
{
  constructor(
    @Inject(InjectionToken.TIMESHEET_REPOSITORY)
    private readonly timesheetRepository: TimesheetRepository,
    private readonly timesheetFactory: TimesheetFactory,
  ) {}

  async execute(command: CreateTimesheetCommand) {
    const grossPayroll = command.entries.reduce(
      (acc, entry) => acc + entry.grossWages,
      0,
    );

    const id = generateId();

    const timesheet = this.timesheetFactory.createTimesheet({
      id,
      grossPayroll,
      status: TimesheetStatus.PENDING,
      payPeriodStart: command.payPeriodStart,
      payPeriodEnd: command.payPeriodEnd,
      checkDate: command.checkDate,
      customerId: command.customerId,
      timesheetEntries: command.entries,
    });

    await this.timesheetRepository.save(timesheet);

    timesheet.createdSuccessfully();

    timesheet.commit();
  }
}
