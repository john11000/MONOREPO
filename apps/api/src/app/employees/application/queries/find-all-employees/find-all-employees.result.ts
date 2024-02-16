import { IQueryResult } from '@nestjs/cqrs';

export class FindAllEmployeesResult implements IQueryResult {
  constructor(
    readonly employees: {
      id: string;
      name: string;
      payType: string;
      payRate: number;
    }[],
  ) {}
}
