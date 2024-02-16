import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import {
  Employee,
  EmployeeImplementation,
  EmployeeProperties,
} from './employee';

export type CreateEmployeeProps = Readonly<{
  id: string;
  name: string;
  payType: string;
  payRate: number;
  customerId: string;
}>;

@Injectable()
export class EmployeeFactory {
  constructor(
    @Inject(EventPublisher) private readonly publisher: EventPublisher,
  ) {}

  createEmployee(props: CreateEmployeeProps): Employee {
    return this.publisher.mergeObjectContext(
      new EmployeeImplementation({
        id: props.id,
        name: props.name,
        payType: props.payType,
        payRate: props.payRate,
        customerId: props.customerId,
      }),
    );
  }

  reconstituteEmployee(props: EmployeeProperties): Employee {
    return this.publisher.mergeObjectContext(
      new EmployeeImplementation({
        id: props.id,
        name: props.name,
        payType: props.payType,
        payRate: props.payRate,
        customerId: props.customerId,
      }),
    );
  }
}
