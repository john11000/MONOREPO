import { TimesheetCreatedEvent } from './events/timesheet-created.event';
import { TimesheetImplementation } from './timesheet';

describe('TimesheetImplementation', () => {
  let timesheet: TimesheetImplementation;

  beforeEach(() => {
    const properties = {
      id: '1',
      grossPayroll: 1000,
      status: 'Pending',
      payPeriodStart: '2022-01-01',
      payPeriodEnd: '2022-01-15',
      checkDate: '2022-01-20',
      customerId: '123',
      timesheetEntries: [],
      notes: 'Sample notes',
    };
    timesheet = new TimesheetImplementation(properties);
  });

  it('should return the correct id', () => {
    expect(timesheet.getId()).toBe('1');
  });

  it('should return the correct gross payroll', () => {
    expect(timesheet.getGrossPayroll()).toBe(1000);
  });

  it('should return the correct status', () => {
    expect(timesheet.getStatus()).toBe('Pending');
  });

  it('should return the correct pay period start', () => {
    expect(timesheet.getPayPeriodStart()).toBe('2022-01-01');
  });

  it('should return the correct pay period end', () => {
    expect(timesheet.getPayPeriodEnd()).toBe('2022-01-15');
  });

  it('should return the correct check date', () => {
    expect(timesheet.getCheckDate()).toBe('2022-01-20');
  });

  it('should return the correct customer id', () => {
    expect(timesheet.getCustomerId()).toBe('123');
  });

  it('should return an empty array for timesheet entries', () => {
    expect(timesheet.getTimesheetEntries()).toEqual([]);
  });

  it('should return the correct notes', () => {
    expect(timesheet.getNotes()).toBe('Sample notes');
  });

  it('should apply TimesheetCreatedEvent when createdSuccessfully is called', () => {
    const applySpy = jest.spyOn(timesheet, 'apply');
    timesheet.createdSuccessfully();
    expect(applySpy).toHaveBeenCalledWith(expect.any(TimesheetCreatedEvent));
  });
});
