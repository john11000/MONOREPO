import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { CustomerFactory } from './customer.factory';
import { CustomerImplementation } from './customer';

describe('CustomerFactory', () => {
  let customerFactory: CustomerFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerFactory,
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    customerFactory = module.get<CustomerFactory>(CustomerFactory);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  describe('createCustomer', () => {
    it('should create a new customer with hashed password', () => {
      // Arrange
      const password = 'password123';

      const props = {
        id: '1',
        businessName: 'Test Business',
        email: 'test@example.com',
        password: bcrypt.hashSync(password, 10),
      };

      jest
        .spyOn(eventPublisher, 'mergeObjectContext')
        .mockReturnValue(new CustomerImplementation(props));

      // Act
      const customer = customerFactory.createCustomer(props);

      // Assert
      expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          businessName: props.businessName,
          email: props.email,
          password: expect.any(String),
        }),
      );
      expect(bcrypt.compareSync(password, customer.getPassword())).toBe(true);
    });
  });

  describe('reconstituteCustomer', () => {
    it('should reconstitute a customer with the provided properties', () => {
      // Arrange
      const props = {
        id: '1',
        businessName: 'Test Business',
        email: 'test@example.com',
        password: 'password123',
      };

      jest
        .spyOn(eventPublisher, 'mergeObjectContext')
        .mockReturnValue(new CustomerImplementation(props));

      // Act
      const customer = customerFactory.reconstituteCustomer(props);

      // Assert
      expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          businessName: props.businessName,
          email: props.email,
          password: props.password,
        }),
      );
      expect(customer.getPassword()).toBe(props.password);
    });
  });
});
