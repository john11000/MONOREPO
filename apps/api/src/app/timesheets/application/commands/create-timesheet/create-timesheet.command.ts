import { ICommand } from '@nestjs/cqrs';

class entry {
  employeeName: string;
  payType: string;
  payRate: number;
  hours: number;
  grossWages: number;
}

export class CreateTimesheetCommand implements ICommand {
  constructor(
    readonly customerId: string,
    readonly checkDate: string,
    readonly payPeriodStart: string,
    readonly payPeriodEnd: string,
    readonly entries: entry[],
  ) {}
}
