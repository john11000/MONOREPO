import { NotFoundException, ForbiddenException } from '@nestjs/common';

import { DeleteEmployeeCommand } from './delete-employee.command';
import { DeleteEmployeeCommandHandler } from './delete-employee.handler';

import { EmployeeRepository } from '../../../domain/employee.repository';
import { Employee } from '../../../domain/employee';

describe('DeleteEmployeeCommandHandler', () => {
  let handler: DeleteEmployeeCommandHandler;
  let employeeRepository: EmployeeRepository;

  beforeEach(() => {
    employeeRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
    handler = new DeleteEmployeeCommandHandler(employeeRepository);
  });

  it('should throw NotFoundException if employee is not found', async () => {
    // Arrange
    const command: DeleteEmployeeCommand = {
      id: '1',
      customerId: '123',
    };

    jest.spyOn(employeeRepository, 'findById').mockResolvedValueOnce(undefined);

    // Act & Assert
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);

    expect(employeeRepository.findById).toHaveBeenCalledWith(command.id);
  });

  it('should throw ForbiddenException if employee does not belong to the customer', async () => {
    // Arrange
    const command: DeleteEmployeeCommand = {
      id: '1',
      customerId: '123',
    };
    const employee = {
      belongsToCustomer: jest.fn().mockReturnValue(false),
    } as unknown as Employee;

    jest.spyOn(employeeRepository, 'findById').mockResolvedValueOnce(employee);

    // Act & Assert
    await expect(handler.execute(command)).rejects.toThrow(ForbiddenException);

    expect(employeeRepository.findById).toHaveBeenCalledWith(command.id);

    expect(employee.belongsToCustomer).toHaveBeenCalledWith(command.customerId);
  });

  it('should delete the employee if it exists and belongs to the customer', async () => {
    // Arrange
    const command: DeleteEmployeeCommand = {
      id: '1',
      customerId: '123',
    };
    const employee = {
      belongsToCustomer: jest.fn().mockReturnValue(true),
    } as unknown as Employee;

    jest.spyOn(employeeRepository, 'findById').mockResolvedValueOnce(employee);

    // Act
    await handler.execute(command);

    // Assert
    expect(employeeRepository.findById).toHaveBeenCalledWith(command.id);

    expect(employee.belongsToCustomer).toHaveBeenCalledWith(command.customerId);

    expect(employeeRepository.delete).toHaveBeenCalledWith(employee);
  });
});
