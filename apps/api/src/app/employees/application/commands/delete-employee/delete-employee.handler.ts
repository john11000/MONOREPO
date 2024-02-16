import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteEmployeeCommand } from './delete-employee.command';
import { InjectionToken } from '../../constants';

import { EmployeeRepository } from '../../../domain/employee.repository';

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeCommandHandler
  implements ICommandHandler<DeleteEmployeeCommand, void>
{
  constructor(
    @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(command: DeleteEmployeeCommand) {
    const employee = await this.employeeRepository.findById(command.id);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (!employee.belongsToCustomer(command.customerId)) {
      throw new ForbiddenException('Employee does not belong to the customer');
    }

    await this.employeeRepository.delete(employee);
  }
}
