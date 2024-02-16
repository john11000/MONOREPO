import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { InjectionToken } from '../../constants';
import { UpdateEmployeeCommand } from './update-employee.command';
import { UpdateEmployeeCommandHandler } from './update-employee.handler';

import { EmployeeRepository } from '../../../domain/employee.repository';
import { EmployeeImplementation } from '../../../domain/employee';

describe('UpdateEmployeeCommandHandler', () => {
  let handler: UpdateEmployeeCommandHandler;
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateEmployeeCommandHandler,
        {
          provide: InjectionToken.EMPLOYEE_REPOSITORY,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<UpdateEmployeeCommandHandler>(
      UpdateEmployeeCommandHandler,
    );
    employeeRepository = module.get<EmployeeRepository>(
      InjectionToken.EMPLOYEE_REPOSITORY,
    );
  });

  describe('execute', () => {
    const command: UpdateEmployeeCommand = {
      id: '1',
      name: 'Jane Doe',
      payType: 'Salary',
      payRate: 50000,
      customerId: '456',
    };

    it('should throw NotFoundException if employee is not found', async () => {
      jest.spyOn(employeeRepository, 'findById').mockResolvedValueOnce(null);

      await expect(handler.execute(command)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if employee does not belong to the customer', async () => {
      const employee = new EmployeeImplementation({
        id: '1',
        name: 'John Doe',
        payType: 'Hourly',
        payRate: 25,
        customerId: '123',
      });
      jest
        .spyOn(employeeRepository, 'findById')
        .mockResolvedValueOnce(employee);

      await expect(handler.execute(command)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should update the employee and call employeeRepository.update', async () => {
      const employee = new EmployeeImplementation({
        id: '1',
        name: 'Jane Doe',
        payType: 'Hourly',
        payRate: 25,
        customerId: '456',
      });

      jest
        .spyOn(employeeRepository, 'findById')
        .mockResolvedValueOnce(employee);

      jest.spyOn(employeeRepository, 'update').mockResolvedValueOnce();

      employee.update = jest.fn();

      await handler.execute(command);

      expect(employee.update).toHaveBeenCalledWith({
        name: command.name,
        payType: command.payType,
        payRate: command.payRate,
      });

      expect(employeeRepository.update).toHaveBeenCalledWith(employee);
    });
  });
});
