import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Application layer
import { InjectionToken } from './application/constants';
import { AddNotesCommandHandler } from './application/commands/add-notes/add-notes.handler';
import { CreateTimesheetCommandHandler } from './application/commands/create-timesheet/create-timesheet.handler';
import { TimesheetCreatedEventHandler } from './application/events/timesheet-created-handler.event';
import { FindAllTimesheetsQueryHandler } from './application/queries/find-all-timesheets/find-all-timesheets.handler';
import { UpdateTimesheetStatusCommandHandler } from './application/commands/update-timesheet-status/update-timesheet-status.handler';

// Domain layer
import { TimesheetFactory } from './domain/timesheet.factory';

// Infrastructure layer
import { TimesheetRepositoryImplementation } from './infrastructure/timesheet-repository-implamentation';

// Interface layer
import { PayRateTimesheetPipe } from './interface/pipes/pay-rate-timesheet.pipe';
import { TimesheetController } from './interface/timesheet.controller';

const application: Provider[] = [
  CreateTimesheetCommandHandler,
  TimesheetCreatedEventHandler,
  FindAllTimesheetsQueryHandler,
  UpdateTimesheetStatusCommandHandler,
  AddNotesCommandHandler,
];

const domain: Provider[] = [TimesheetFactory];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.TIMESHEET_REPOSITORY,
    useClass: TimesheetRepositoryImplementation,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [TimesheetController],
  providers: [
    ...application,
    ...domain,
    ...infrastructure,
    PayRateTimesheetPipe,
  ],
})
export class TimesheetsModule {}
