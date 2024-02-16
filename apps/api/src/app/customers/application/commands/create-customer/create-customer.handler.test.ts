import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateCustomerCommand } from './create-customer.command';
import { CreateCustomerCommandHandler } from './create-customer.handler';
import { Customer } from '../../../domain/customer';
import { CustomerRepository } from '../../../domain/customer.repository';
import { InjectionToken } from '../../constants';
import { CustomerFactory } from '../../../domain/customer.factory';
import { generateId, hashPassword } from '@ocmi/api/libs/utils';

describe('CreateCustomerCommandHandler', () => {
  let handler: ICommandHandler<CreateCustomerCommand, void>;
  let repository: CustomerRepository;
  let factory: CustomerFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerCommandHandler,
        {
          provide: InjectionToken.CUSTOMER_REPOSITORY,
          useValue: {
            exists: jest.fn(),
            newId: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CustomerFactory,
          useValue: {
            createCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateCustomerCommandHandler>(
      CreateCustomerCommandHandler,
    );
    repository = module.get<CustomerRepository>(
      InjectionToken.CUSTOMER_REPOSITORY,
    );
    factory = module.get<CustomerFactory>(CustomerFactory);
  });

  describe('execute', () => {
    it('should create a customer', async () => {
      const command = new CreateCustomerCommand(
        'Business Name',
        'test@example.com',
        'password',
      );

      const id = generateId();

      const hashedPassword = await hashPassword(command.password);

      jest.spyOn(repository, 'exists').mockResolvedValueOnce(false);

      const customer: Customer = {
        commit: jest.fn(),
        getId: jest.fn().mockReturnValue(id),
        getBusinessName: jest.fn().mockReturnValue('Business Name'),
        getEmail: jest.fn().mockReturnValue('test@example.com'),
        getPassword: jest.fn().mockReturnValue(hashedPassword),
        createdSuccessfully: jest.fn(),
        update: jest.fn(),
      };

      jest.spyOn(factory, 'createCustomer').mockReturnValueOnce(customer);

      await handler.execute(command);

      expect(repository.exists).toHaveBeenCalledWith('test@example.com');

      expect(factory.createCustomer).toHaveBeenCalledWith({
        id: expect.any(String),
        businessName: 'Business Name',
        email: 'test@example.com',
        password: expect.any(String),
      });

      expect(factory.createCustomer).toHaveReturnedWith(customer);
      expect(repository.create).toHaveBeenCalledWith(customer);
      expect(customer.createdSuccessfully).toHaveBeenCalled();
      expect(customer.commit).toHaveBeenCalled();
    });

    it('should throw BadRequestException if customer already exists', async () => {
      const command = new CreateCustomerCommand(
        'Business Name',
        'test@example.com',
        'password',
      );

      jest.spyOn(repository, 'exists').mockResolvedValueOnce(true);

      await expect(handler.execute(command)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
