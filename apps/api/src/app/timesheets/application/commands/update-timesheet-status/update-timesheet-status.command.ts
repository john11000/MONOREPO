import { ICommand } from '@nestjs/cqrs';

export class UpdateTimesheetStatusCommand implements ICommand {
  constructor(
    readonly timesheetId: string,
    readonly status: string,
  ) {}
}
