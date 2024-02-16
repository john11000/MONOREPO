import { AggregateRoot } from '@nestjs/cqrs';
import { CreatedEmployeeEvent } from './events/created-employee.event';

export type EmployeeProperties = Readonly<
  Required<{
    id: string;
    name: string;
    payType: string;
    payRate: number;
    customerId: string;
  }>
>;

export interface Employee {
  getId: () => string;
  getName: () => string;
  getPayType: () => string;
  getPayRate: () => number;
  getCustomerId: () => string;
  createdSuccessfully: () => void;
  belongsToCustomer: (customerId: string) => boolean;
  commit: () => void;
  update: (properties: Partial<EmployeeProperties>) => void;
}

export class EmployeeImplementation extends AggregateRoot implements Employee {
  private readonly id: string;
  private name: string;
  private payType: string;
  private payRate: number;
  private customerId: string;

  constructor(private readonly properties: EmployeeProperties) {
    super();
    Object.assign(this, properties);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPayType() {
    return this.payType;
  }

  getPayRate() {
    return this.payRate;
  }

  getCustomerId() {
    return this.customerId;
  }

  createdSuccessfully() {
    this.apply(new CreatedEmployeeEvent(this.name));
  }

  update(properties: Partial<EmployeeProperties>) {
    Object.assign(this, properties);
  }

  belongsToCustomer(customerId: string) {
    return this.customerId === customerId;
  }
}
