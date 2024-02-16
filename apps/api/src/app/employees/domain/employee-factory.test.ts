import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';

import { CreateEmployeeProps, EmployeeFactory } from './employee-factory';
import { EmployeeProperties, EmployeeImplementation } from './employee';

describe('EmployeeFactory', () => {
  let employeeFactory: EmployeeFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeFactory,
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    employeeFactory = module.get<EmployeeFactory>(EmployeeFactory);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  describe('createEmployee', () => {
    it('should create a new employee with the provided properties', () => {
      const props: CreateEmployeeProps = {
        id: '1',
        name: 'John Doe',
        payType: 'hourly',
        payRate: 25,
        customerId: '123',
      };

      jest
        .spyOn(eventPublisher, 'mergeObjectContext')
        .mockReturnValue(new EmployeeImplementation(props));

      const employee = employeeFactory.createEmployee(props);

      expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          name: props.name,
          payType: props.payType,
          payRate: props.payRate,
          customerId: props.customerId,
        }),
      );
      expect(employee).toBeDefined();
    });
  });

  describe('reconstituteEmployee', () => {
    it('should reconstitute an employee with the provided properties', () => {
      const props: EmployeeProperties = {
        id: '1',
        name: 'John Doe',
        payType: 'hourly',
        payRate: 25,
        customerId: '123',
      };

      jest
        .spyOn(eventPublisher, 'mergeObjectContext')
        .mockReturnValue(new EmployeeImplementation(props));

      const employee = employeeFactory.reconstituteEmployee(props);
      console.log(employee);

      expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          name: props.name,
          payType: props.payType,
          payRate: props.payRate,
          customerId: props.customerId,
        }),
      );

      expect(employee).toBeDefined();
    });
  });
});
