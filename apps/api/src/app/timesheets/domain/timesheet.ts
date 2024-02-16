import { AggregateRoot } from '@nestjs/cqrs';
import { TimesheetCreatedEvent } from './events/timesheet-created.event';

export type TimesheetEntryEssentialsProperties = Readonly<
  Required<{
    employeeName: string;
    payType: string;
    payRate: number;
    grossWages: number;
  }>
>;

export type TimesheetEntryOptionalProperties = Partial<{
  hours: number;
}>;

export type TimesheetEntryProperties = TimesheetEntryEssentialsProperties &
  TimesheetEntryOptionalProperties;

export type TimesheetEssentialProperties = Readonly<
  Required<{
    id: string;
    grossPayroll: number;
    status: string;
    payPeriodStart: string;
    payPeriodEnd: string;
    checkDate: string;
    customerId: string;
    timesheetEntries: TimesheetEntryProperties[];
  }>
>;

export type TimesheetOptionalProperties = Partial<{
  notes: string;
}>;

export type TimesheetProperties = TimesheetEssentialProperties &
  TimesheetOptionalProperties;

export interface Timesheet {
  getId: () => string;
  getGrossPayroll: () => number;
  getStatus: () => string;
  getPayPeriodStart: () => string;
  getPayPeriodEnd: () => string;
  getCheckDate: () => string;
  getCustomerId: () => string;
  getTimesheetEntries: () => TimesheetEntryProperties[];
  getNotes: () => string;
  createdSuccessfully: () => void;
  commit: () => void;
}

export class TimesheetImplementation
  extends AggregateRoot
  implements Timesheet
{
  private readonly id: string;
  private grossPayroll: number;
  private status: string;
  private payPeriodStart: string;
  private payPeriodEnd: string;
  private checkDate: string;
  private customerId: string;
  private timesheetEntries: TimesheetEntryProperties[];
  private notes: string;

  constructor(private readonly properties: TimesheetProperties) {
    super();
    Object.assign(this, properties);
  }

  getId() {
    return this.id;
  }

  getGrossPayroll() {
    return this.grossPayroll;
  }

  getStatus() {
    return this.status;
  }

  getPayPeriodStart() {
    return this.payPeriodStart;
  }

  getPayPeriodEnd() {
    return this.payPeriodEnd;
  }

  getCheckDate() {
    return this.checkDate;
  }

  getCustomerId() {
    return this.customerId;
  }

  getTimesheetEntries() {
    return this.timesheetEntries;
  }

  getNotes() {
    return this.notes;
  }

  createdSuccessfully() {
    this.apply(new TimesheetCreatedEvent(this.customerId));
  }
}
