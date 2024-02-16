import { AggregateRoot } from '@nestjs/cqrs';

import { CustomerCreatedEvent } from './events/customer-created.event';

export type CustomerProperties = Readonly<
  Required<{
    id: string;
    businessName: string;
    email: string;
    password: string;
  }>
>;

export interface Customer {
  getId: () => string;
  getBusinessName: () => string;
  getEmail: () => string;
  getPassword: () => string;
  createdSuccessfully: () => void;
  update: (businessName: string) => void;
  commit: () => void;
}

export class CustomerImplementation extends AggregateRoot implements Customer {
  private readonly id: string;
  private businessName: string;
  private email: string;
  private password: string;

  constructor(private readonly properties: CustomerProperties) {
    super();
    Object.assign(this, properties);
  }

  getId() {
    return this.id;
  }

  getBusinessName() {
    return this.businessName;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  createdSuccessfully() {
    this.apply(new CustomerCreatedEvent(this.email));
  }

  update(businessName: string) {
    this.businessName = businessName;
  }
}
