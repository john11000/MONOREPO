import { Test, TestingModule } from '@nestjs/testing';

import { FindAllCustomersQueryHandler } from './find-all-customers.handler';
import { CustomerRepository } from '../../../domain/customer.repository';
import { InjectionToken } from '../../constants';
import { FindAllCustomersResult } from './find-all-customers.result';

describe('FindAllCustomersQueryHandler', () => {
  let handler: FindAllCustomersQueryHandler;
  let repository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllCustomersQueryHandler,
        {
          provide: InjectionToken.CUSTOMER_REPOSITORY,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                getId: jest.fn().mockReturnValue('1'),
                getBusinessName: jest.fn().mockReturnValue('Test Business'),
                getEmail: jest.fn().mockReturnValue('test@example.com'),
              },
              {
                getId: jest.fn().mockReturnValue('2'),
                getBusinessName: jest.fn().mockReturnValue('Another Business'),
                getEmail: jest.fn().mockReturnValue('another@example.com'),
              },
            ]),
          },
        },
      ],
    }).compile();

    handler = module.get<FindAllCustomersQueryHandler>(
      FindAllCustomersQueryHandler,
    );
    repository = module.get<CustomerRepository>(
      InjectionToken.CUSTOMER_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should return all customers', async () => {
      // Arrange
      const expectedCustomers = [
        {
          id: '1',
          businessName: 'Test Business',
          email: 'test@example.com',
        },
        {
          id: '2',
          businessName: 'Another Business',
          email: 'another@example.com',
        },
      ];

      // Act
      const result = await handler.execute();

      // Assert
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expect.any(FindAllCustomersResult));
      expect(result.customers).toEqual(expectedCustomers);
    });
  });
});
