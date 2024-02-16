import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { InjectionToken } from '../../constants';
import { UpdateCustomerCommand } from './update-customer.command';
import { UpdateCustomerCommandHandler } from './update-customer.handler';

import { CustomerRepository } from '../../../domain/customer.repository';
import { CustomerImplementation } from '../../../domain/customer';

describe('UpdateCustomerCommandHandler', () => {
  let handler: UpdateCustomerCommandHandler;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCustomerCommandHandler,
        {
          provide: InjectionToken.CUSTOMER_REPOSITORY,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<UpdateCustomerCommandHandler>(
      UpdateCustomerCommandHandler,
    );
    customerRepository = module.get<CustomerRepository>(
      InjectionToken.CUSTOMER_REPOSITORY,
    );
  });

  describe('execute', () => {
    const command: UpdateCustomerCommand = {
      id: '1',
      businessName: 'New Business Name',
    };

    it('should throw NotFoundException if customer is not found', async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValueOnce(null);

      await expect(handler.execute(command)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should update the customer and call customerRepository.update', async () => {
      const customer = new CustomerImplementation({
        id: '1',
        businessName: 'Old Business Name',
        email: 'example@example.com',
        password: 'password123',
      });

      jest
        .spyOn(customerRepository, 'findById')
        .mockResolvedValueOnce(customer);

      jest.spyOn(customerRepository, 'update').mockResolvedValueOnce();

      customer.update = jest.fn();

      await handler.execute(command);

      expect(customer.update).toHaveBeenCalledWith(command.businessName);

      expect(customerRepository.update).toHaveBeenCalledWith(customer);
    });
  });
});
