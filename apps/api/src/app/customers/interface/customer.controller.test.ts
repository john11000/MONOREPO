import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CustomerController } from './customer.controller';
import {
  CreateCustomerRequestDto,
  UpdateCustomerRequestDto,
} from './dtos/request';
import { CreateCustomerCommand } from '../application/commands/create-customer/create-customer.command';
import { FindAllCustomersQuery } from '../application/queries/find-all-customers/find-all-customers.query';
import { UpdateCustomerCommand } from '../application/commands/update-customer/update-customer.command';

describe('CustomerController', () => {
  let controller: CustomerController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
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

    controller = module.get<CustomerController>(CustomerController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      const createCustomerRequestDto: CreateCustomerRequestDto = {
        businessName: 'Test Business',
        email: 'test@example.com',
        password: 'password',
      };

      const executeSpy = jest.spyOn(commandBus, 'execute');

      await controller.createCustomer(createCustomerRequestDto);

      expect(executeSpy).toHaveBeenCalledWith(
        new CreateCustomerCommand(
          createCustomerRequestDto.businessName,
          createCustomerRequestDto.email,
          createCustomerRequestDto.password,
        ),
      );
    });
  });

  describe('findAllCustomers', () => {
    it('should return all customers', async () => {
      const executeSpy = jest.spyOn(queryBus, 'execute');

      await controller.findAllCustomers();

      expect(executeSpy).toHaveBeenCalledWith(new FindAllCustomersQuery());
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      const id = '123';
      const updateCustomerRequestDto: UpdateCustomerRequestDto = {
        businessName: 'Updated Business',
      };

      const executeSpy = jest.spyOn(commandBus, 'execute');

      await controller.updateCustomer(id, updateCustomerRequestDto);

      expect(executeSpy).toHaveBeenCalledWith(
        new UpdateCustomerCommand(id, updateCustomerRequestDto.businessName),
      );
    });
  });
});
