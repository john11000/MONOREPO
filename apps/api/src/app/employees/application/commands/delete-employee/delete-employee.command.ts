import { ICommand } from '@nestjs/cqrs';

export class DeleteEmployeeCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly customerId: string,
  ) {}
}
