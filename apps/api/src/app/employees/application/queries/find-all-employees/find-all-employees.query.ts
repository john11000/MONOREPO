import { IQuery } from '@nestjs/cqrs';

export class FindAllEmployeesQuery implements IQuery {
  constructor(readonly customerId: string) {}
}
