import { ICommand } from '@nestjs/cqrs';

export class UpdateEmployeeCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly payType: string,
    readonly payRate: number,
    readonly customerId: string,
  ) {}
}
