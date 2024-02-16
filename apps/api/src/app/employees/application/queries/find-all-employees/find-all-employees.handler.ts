import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../../constants';
import { FindAllEmployeesQuery } from './find-all-employees.query';
import { FindAllEmployeesResult } from './find-all-employees.result';

import { EmployeeRepository } from '../../../domain/employee.repository';

@QueryHandler(FindAllEmployeesQuery)
export class FindAllEmployeesQueryHandler
  implements IQueryHandler<FindAllEmployeesQuery, FindAllEmployeesResult>
{
  constructor(
    @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(query: FindAllEmployeesQuery) {
    const employees = await this.employeeRepository.findAll(query.customerId);

    return new FindAllEmployeesResult(
      employees.map((employee) => ({
        id: employee.getId(),
        name: employee.getName(),
        payType: employee.getPayType(),
        payRate: employee.getPayRate(),
      })),
    );
  }
}
