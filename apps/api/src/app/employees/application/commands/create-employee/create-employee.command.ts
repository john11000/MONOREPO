import { ICommand } from '@nestjs/cqrs';

export class CreateEmployeeCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly payType: string,
    readonly payRate: number,
    readonly customerId: string,
  ) {}
}
