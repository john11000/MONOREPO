import { IQueryResult } from '@nestjs/cqrs';

export class FindAllTimesheetsResult implements IQueryResult {
  constructor(
    readonly timesheets: {
      id: string;
      grossPayroll: number;
      status: string;
      notes: string;
      payPeriodStart: string;
      payPeriodEnd: string;
      checkDate: string;
      customerId: string;
      timesheetEntries: {
        employeeName: string;
        grossWages: number;
        payRate: number;
        payType: string;
        hours?: number | null;
      }[];
    }[],
  ) {}
}
