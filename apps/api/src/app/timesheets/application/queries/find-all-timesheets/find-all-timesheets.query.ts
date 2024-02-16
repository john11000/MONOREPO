import { IQuery } from '@nestjs/cqrs';

export class FindAllTimesheetsQuery implements IQuery {
  constructor(public readonly customerId: string | null) {}
}
