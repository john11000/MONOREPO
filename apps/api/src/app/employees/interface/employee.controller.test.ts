import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Payload } from '../../auth/interface/types';

import { EmployeeController } from './employee.controller';
import { CreateEmployeeRequestDto } from './dto/request';
import { FindAllEmployeesResponseDto } from './dto/response';

import { CreateEmployeeCommand } from '../application/commands/create-employee/create-employee.command';
import { FindAllEmployeesQuery } from '../application/queries/find-all-employees/find-all-employees.query';
import { UpdateEmployeeCommand } from '../application/commands/update-employee/update-employee.command';
import { DeleteEmployeeCommand } from '../application/commands/delete-employee/delete-employee.command';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('createEmployee', () => {
    it('should create an employee', async () => {
      const createEmployeeDto: CreateEmployeeRequestDto = {
        name: 'John Doe',
        payType: 'Hourly',
        payRate: 20,
      };

      const request = {
        user: {
          customerId: '123',
        },
      } as Request & { user: Payload };

      await controller.createEmployee(createEmployeeDto, request);

      const expectedCommand = new CreateEmployeeCommand(
        createEmployeeDto.name,
        createEmployeeDto.payType,
        createEmployeeDto.payRate,
        request.user.customerId,
      );

      expect(commandBus.execute).toHaveBeenCalledWith(expectedCommand);
    });
  });

  describe('findAllEmployees', () => {
    it('should find all employees, when there are employees associated with the customer', async () => {
      const request = {
        user: {
          customerId: '123',
        },
      } as Request & { user: Payload };

      const expectedResult: FindAllEmployeesResponseDto = {
        employees: [
          {
            id: '1',
            name: 'John Doe',
            payType: 'Hourly',
            payRate: 20,
          },
          {
            id: '2',
            name: 'Jane Smith',
            payType: 'Salary',
            payRate: 50000,
          },
        ],
      };

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(expectedResult);

      const result = await controller.findAllEmployees(request);

      const expectedQuery = new FindAllEmployeesQuery(request.user.customerId);

      expect(queryBus.execute).toHaveBeenCalledWith(expectedQuery);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateEmployee', () => {
    it('should update an employee', async () => {
      const updateEmployeeDto = {
        name: 'Jane Doe',
        payType: 'Salary',
        payRate: 50000,
      };

      const request = {
        user: {
          customerId: '123',
        },
      } as Request & { user: Payload };

      const id = '1';

      await controller.updateEmployee(updateEmployeeDto, request, id);

      const expectedCommand = new UpdateEmployeeCommand(
        id,
        updateEmployeeDto.name,
        updateEmployeeDto.payType,
        updateEmployeeDto.payRate,
        request.user.customerId,
      );

      expect(commandBus.execute).toHaveBeenCalledWith(expectedCommand);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee', async () => {
      const request = {
        user: {
          customerId: '123',
        },
      } as Request & { user: Payload };

      const id = '1';

      await controller.deleteEmployee(request, id);

      const expectedCommand = new DeleteEmployeeCommand(
        id,
        request.user.customerId,
      );

      expect(commandBus.execute).toHaveBeenCalledWith(expectedCommand);
    });
  });
});
