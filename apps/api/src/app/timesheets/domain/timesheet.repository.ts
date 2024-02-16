import { Timesheet } from './timesheet';

export interface TimesheetRepository {
  save: (timesheet: Timesheet) => Promise<void>;
  findAll: (customerId?: string) => Promise<Timesheet[]>;
  findById: (id: string) => Promise<Timesheet | null>;
  updateStatus: (id: string, status: string) => Promise<void>;
  addNotes: (id: string, notes: string) => Promise<void>;
}
