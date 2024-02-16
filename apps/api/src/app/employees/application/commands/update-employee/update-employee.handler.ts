import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateEmployeeCommand } from './update-employee.command';
import { InjectionToken } from '../../constants';

import { EmployeeRepository } from '../../../domain/employee.repository';

@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeCommandHandler
  implements ICommandHandler<UpdateEmployeeCommand, void>
{
  constructor(
    @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(command: UpdateEmployeeCommand) {
    const employee = await this.employeeRepository.findById(command.id);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (!employee.belongsToCustomer(command.customerId)) {
      throw new ForbiddenException('Employee does not belong to the customer');
    }

    employee.update({
      name: command.name,
      payType: command.payType,
      payRate: command.payRate,
    });

    await this.employeeRepository.update(employee);
  }
}
