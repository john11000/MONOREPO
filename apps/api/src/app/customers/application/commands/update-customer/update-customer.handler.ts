import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateCustomerCommand } from './update-customer.command';
import { InjectionToken } from '../../constants';

import { CustomerRepository } from '../../../domain/customer.repository';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerCommandHandler
  implements ICommandHandler<UpdateCustomerCommand, void>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(command: UpdateCustomerCommand) {
    const customer = await this.customerRepository.findById(command.id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    customer.update(command.businessName);

    await this.customerRepository.update(customer);
  }
}
