import { Test, TestingModule } from '@nestjs/testing';
import { FindAllEmployeesQueryHandler } from './find-all-employees.handler';
import { EmployeeRepository } from '../../../domain/employee.repository';
import { FindAllEmployeesQuery } from './find-all-employees.query';
import { FindAllEmployeesResult } from './find-all-employees.result';
import { Employee } from '../../../domain/employee';
import { InjectionToken } from '../../constants';

describe('FindAllEmployeesQueryHandler', () => {
  let handler: FindAllEmployeesQueryHandler;
  let repository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllEmployeesQueryHandler,
        {
          provide: InjectionToken.EMPLOYEE_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<FindAllEmployeesQueryHandler>(
      FindAllEmployeesQueryHandler,
    );
    repository = module.get<EmployeeRepository>(
      InjectionToken.EMPLOYEE_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should return all employees, when customer id is valid', async () => {
      const employees: Employee[] = [
        {
          getId: jest.fn().mockReturnValue('1'),
          getName: jest.fn().mockReturnValue('John Doe'),
          getPayType: jest.fn().mockReturnValue('Hourly'),
          getPayRate: jest.fn().mockReturnValue(20),
          getCustomerId: jest.fn().mockReturnValue('1'),
          commit: jest.fn(),
          createdSuccessfully: jest.fn(),
          update: jest.fn(),
          belongsToCustomer: jest.fn().mockReturnValue(true),
        },
        {
          getId: jest.fn().mockReturnValue('2'),
          getName: jest.fn().mockReturnValue('Jane Smith'),
          getPayType: jest.fn().mockReturnValue('Salary'),
          getPayRate: jest.fn().mockReturnValue(50000),
          getCustomerId: jest.fn().mockReturnValue('1'),
          commit: jest.fn(),
          createdSuccessfully: jest.fn(),
          update: jest.fn(),
          belongsToCustomer: jest.fn().mockReturnValue(true),
        },
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValueOnce(employees);

      const result = await handler.execute(new FindAllEmployeesQuery('1'));

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(
        new FindAllEmployeesResult([
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
        ]),
      );
    });
  });
});
