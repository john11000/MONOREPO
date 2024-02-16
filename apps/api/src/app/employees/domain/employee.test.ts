import { EmployeeImplementation } from './employee';
import { CreatedEmployeeEvent } from './events/created-employee.event';

describe('EmployeeImplementation', () => {
  let employee: EmployeeImplementation;
  const properties = {
    id: '1',
    name: 'John Doe',
    payType: 'Hourly',
    payRate: 25,
    customerId: '123',
  };

  beforeEach(() => {
    employee = new EmployeeImplementation(properties);
  });

  it('should return the correct id', () => {
    expect(employee.getId()).toEqual(properties.id);
  });

  it('should return the correct name', () => {
    expect(employee.getName()).toEqual(properties.name);
  });

  it('should return the correct pay type', () => {
    expect(employee.getPayType()).toEqual(properties.payType);
  });

  it('should return the correct pay rate', () => {
    expect(employee.getPayRate()).toEqual(properties.payRate);
  });

  it('should return the correct customer id', () => {
    expect(employee.getCustomerId()).toEqual(properties.customerId);
  });

  it('should apply the CreatedEmployeeEvent when createdSuccessfully is called', () => {
    const spy = jest.spyOn(employee, 'apply');
    employee.createdSuccessfully();
    expect(spy).toHaveBeenCalledWith(new CreatedEmployeeEvent(properties.name));
  });

  it('should update the properties when update is called', () => {
    const newProperties = {
      name: 'Jane Doe',
      payType: 'Salary',
      payRate: 50000,
      customerId: '456',
    };
    employee.update(newProperties);
    expect(employee.getName()).toEqual(newProperties.name);
    expect(employee.getPayType()).toEqual(newProperties.payType);
    expect(employee.getPayRate()).toEqual(newProperties.payRate);
    expect(employee.getCustomerId()).toEqual(newProperties.customerId);
  });

  it('should return true if the employee belongs to the customer', () => {
    expect(employee.belongsToCustomer(properties.customerId)).toEqual(true);
  });

  it('should return false if the employee does not belong to the customer', () => {
    expect(employee.belongsToCustomer('456')).toEqual(false);
  });
});
