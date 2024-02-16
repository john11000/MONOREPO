import { IQueryResult } from '@nestjs/cqrs';

export class FindAllCustomersResult implements IQueryResult {
  constructor(
    readonly customers: {
      id: string;
      businessName: string;
      email: string;
    }[],
  ) {}
}
