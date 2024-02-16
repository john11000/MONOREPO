import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import {
  Customer,
  CustomerImplementation,
  CustomerProperties,
} from './customer';

export type CreateCustomerProps = Readonly<{
  id: string;
  businessName: string;
  email: string;
  password: string;
}>;

@Injectable()
export class CustomerFactory {
  constructor(
    @Inject(EventPublisher) private readonly publisher: EventPublisher,
  ) {}

  createCustomer(props: CreateCustomerProps): Customer {
    return this.publisher.mergeObjectContext(
      new CustomerImplementation({
        id: props.id,
        businessName: props.businessName,
        email: props.email,
        password: props.password,
      }),
    );
  }

  reconstituteCustomer(props: CustomerProperties): Customer {
    return this.publisher.mergeObjectContext(
      new CustomerImplementation({
        id: props.id,
        businessName: props.businessName,
        email: props.email,
        password: props.password,
      }),
    );
  }
}
