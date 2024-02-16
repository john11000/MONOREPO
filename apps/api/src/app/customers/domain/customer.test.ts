import { CustomerImplementation } from './customer';
import { CustomerCreatedEvent } from './events/customer-created.event';

describe('CustomerImplementation', () => {
  let customer: CustomerImplementation;

  beforeEach(() => {
    const properties = {
      id: '1',
      businessName: 'Acme Corp',
      email: 'test@example.com',
      password: 'password123',
    };
    customer = new CustomerImplementation(properties);
  });

  it('should return the correct id', () => {
    expect(customer.getId()).toBe('1');
  });

  it('should return the correct business name', () => {
    expect(customer.getBusinessName()).toBe('Acme Corp');
  });

  it('should return the correct email', () => {
    expect(customer.getEmail()).toBe('test@example.com');
  });

  it('should return the correct password', () => {
    expect(customer.getPassword()).toBe('password123');
  });

  it('should apply a CustomerCreatedEvent when createdSuccessfully is called', () => {
    const applySpy = jest.spyOn(customer, 'apply');
    customer.createdSuccessfully();
    expect(applySpy).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent));
  });

  it('should update the business name', () => {
    customer.update('New Business Name');
    expect(customer.getBusinessName()).toBe('New Business Name');
  });
});
