import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import {
  Timesheet,
  TimesheetEntryProperties,
  TimesheetImplementation,
  TimesheetProperties,
} from './timesheet';

export type CreateTimesheetProps = Readonly<{
  id: string;
  grossPayroll: number;
  status: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  checkDate: string;
  customerId: string;
  timesheetEntries: TimesheetEntryProperties[];
}>;

@Injectable()
export class TimesheetFactory {
  constructor(
    @Inject(EventPublisher) private readonly publisher: EventPublisher,
  ) {}

  createTimesheet(props: CreateTimesheetProps): Timesheet {
    return this.publisher.mergeObjectContext(
      new TimesheetImplementation({
        id: props.id,
        grossPayroll: props.grossPayroll,
        status: props.status,
        payPeriodStart: props.payPeriodStart,
        payPeriodEnd: props.payPeriodEnd,
        checkDate: props.checkDate,
        customerId: props.customerId,
        timesheetEntries: props.timesheetEntries,
      }),
    );
  }

  reconstituteTimesheet(props: TimesheetProperties): Timesheet {
    return this.publisher.mergeObjectContext(
      new TimesheetImplementation({
        id: props.id,
        grossPayroll: props.grossPayroll,
        status: props.status,
        payPeriodStart: props.payPeriodStart,
        payPeriodEnd: props.payPeriodEnd,
        checkDate: props.checkDate,
        notes: props.notes,
        customerId: props.customerId,
        timesheetEntries: props.timesheetEntries,
      }),
    );
  }
}
