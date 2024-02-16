import { ApiProperty } from '@nestjs/swagger';
import { FindAllTimesheetsResult } from '../../../application/queries/find-all-timesheets/find-all-timesheets.result';

class TimesheetEntry {
  @ApiProperty({ description: 'Employee name', example: 'John Doe' })
  employeeName: string;

  @ApiProperty({ description: 'Gross wages', example: 500 })
  grossWages: number;

  @ApiProperty({ description: 'Pay rate', example: 20 })
  payRate: number;

  @ApiProperty({ description: 'Pay type', example: 'Hourly' })
  payType: string;

  @ApiProperty({ description: 'Hours worked', example: 25 })
  hours: number;
}

class Timesheets extends FindAllTimesheetsResult {
  @ApiProperty({ description: 'Timesheet id', example: 'asdf1234' })
  id: string;

  @ApiProperty({ description: 'Gross payroll', example: 1000 })
  grossPayroll: number;

  @ApiProperty({ description: 'Timesheet status', example: 'Pending' })
  status: string;

  @ApiProperty({ description: 'Notes', example: 'Some notes' })
  notes: string;

  @ApiProperty({
    description: 'Start date of pay period',
    example: '2022-01-01',
  })
  payPeriodStart: string;

  @ApiProperty({ description: 'End date of pay period', example: '2022-01-15' })
  payPeriodEnd: string;

  @ApiProperty({ description: 'Check date', example: '2022-01-20' })
  checkDate: string;

  @ApiProperty({ description: 'Customer id', example: 'customer123' })
  customerId: string;

  @ApiProperty({
    description: 'Timesheet entries',
    example: [
      {
        employeeName: 'John Doe',
        grossWages: 500,
        payRate: 20,
        payType: 'Hourly',
        hours: 25,
      },
      {
        employeeName: 'Jane Smith',
        grossWages: 600,
        payRate: 25,
        payType: 'Hourly',
        hours: 24,
      },
    ],
  })
  timesheetEntries: TimesheetEntry[];
}

export class FindAllTimesheetsResponseDto extends FindAllTimesheetsResult {
  @ApiProperty({ description: 'Timesheets', type: [Timesheets] })
  timesheets: Timesheets[];
}
