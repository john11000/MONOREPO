import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// application layer
import { InjectionToken } from './application/constants';
import { CreateEmployeeCommandHandler } from './application/commands/create-employee/create-employee.handler';
import { CreatedEmployeeEventHandler } from './application/events/created-employee-handler.event';
import { FindAllEmployeesQueryHandler } from './application/queries/find-all-employees/find-all-employees.handler';
import { UpdateEmployeeCommandHandler } from './application/commands/update-employee/update-employee.handler';
import { DeleteEmployeeCommandHandler } from './application/commands/delete-employee/delete-employee.handler';

// domain layer
import { EmployeeFactory } from './domain/employee-factory';

// infrastructure layer
import { EmployeeRepositoryImplementation } from './infrastructure/repositories/Employee-repository-implementation';

// interface layer
import { EmployeeController } from './interface/employee.controller';
import { PayRatePipe } from './interface/pipes/pay-rate.pipe';

const application: Provider[] = [
  CreateEmployeeCommandHandler,
  CreatedEmployeeEventHandler,
  FindAllEmployeesQueryHandler,
  UpdateEmployeeCommandHandler,
  DeleteEmployeeCommandHandler,
];

const domain: Provider[] = [EmployeeFactory];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepositoryImplementation,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [EmployeeController],
  providers: [...application, ...domain, ...infrastructure, PayRatePipe],
})
export class EmployeeModule {}
