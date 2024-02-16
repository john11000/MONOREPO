import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Application layer
import { CreateCustomerCommandHandler } from './application/commands/create-customer/create-customer.handler';
import { CustomerCreatedEventHandler } from './application/events/customer-created-handler.event';
import { FindAllCustomersQueryHandler } from './application/queries/find-all-customers/find-all-customers.handler';
import { UpdateCustomerCommandHandler } from './application/commands/update-customer/update-customer.handler';
import { InjectionToken } from './application/constants';

// Domain layer
import { CustomerFactory } from './domain/customer.factory';

// Infrastructure layer
import { CustomerRepositoryImplementation } from './infrastructure/customer-repository-implementation';

// Interface layer
import { CustomerController } from './interface/customer.controller';

const application: Provider[] = [
  CreateCustomerCommandHandler,
  CustomerCreatedEventHandler,
  FindAllCustomersQueryHandler,
  UpdateCustomerCommandHandler,
];

const domain: Provider[] = [CustomerFactory];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.CUSTOMER_REPOSITORY,
    useClass: CustomerRepositoryImplementation,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [CustomerController],
  providers: [...application, ...domain, ...infrastructure],
})
export class CustomersModule {}
