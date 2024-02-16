import { ICommand } from '@nestjs/cqrs';

export class AddNotesCommand implements ICommand {
  constructor(
    readonly timesheetId: string,
    readonly notes: string,
  ) {}
}
