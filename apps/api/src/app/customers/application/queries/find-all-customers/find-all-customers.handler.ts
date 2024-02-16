import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../../constants';
import { FindAllCustomersQuery } from './find-all-customers.query';
import { FindAllCustomersResult } from './find-all-customers.result';

import { CustomerRepository } from '../../../domain/customer.repository';

@QueryHandler(FindAllCustomersQuery)
export class FindAllCustomersQueryHandler
  implements IQueryHandler<FindAllCustomersQuery, FindAllCustomersResult>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute() {
    const customers = await this.customerRepository.findAll();

    return new FindAllCustomersResult(
      customers.map((customer) => ({
        id: customer.getId(),
        businessName: customer.getBusinessName(),
        email: customer.getEmail(),
      })),
    );
  }
}
