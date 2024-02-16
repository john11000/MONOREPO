import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../../constants';
import { FindAllTimesheetsQuery } from './find-all-timesheets.query';
import { FindAllTimesheetsResult } from './find-all-timesheets.result';

import { TimesheetRepository } from '../../../domain/timesheet.repository';

@QueryHandler(FindAllTimesheetsQuery)
export class FindAllTimesheetsQueryHandler
  implements IQueryHandler<FindAllTimesheetsQuery, FindAllTimesheetsResult>
{
  constructor(
    @Inject(InjectionToken.TIMESHEET_REPOSITORY)
    private readonly timesheetRepository: TimesheetRepository,
  ) {}

  async execute(query: FindAllTimesheetsQuery) {
    const timesheets = await this.timesheetRepository.findAll(query.customerId);

    return new FindAllTimesheetsResult(
      timesheets.map((timesheet) => ({
        id: timesheet.getId(),
        payPeriodStart: timesheet.getPayPeriodStart(),
        payPeriodEnd: timesheet.getPayPeriodEnd(),
        grossPayroll: timesheet.getGrossPayroll(),
        notes: timesheet.getNotes(),
        checkDate: timesheet.getCheckDate(),
        status: timesheet.getStatus(),
        customerId: timesheet.getCustomerId(),
        timesheetEntries: timesheet.getTimesheetEntries(),
      })),
    );
  }
}
