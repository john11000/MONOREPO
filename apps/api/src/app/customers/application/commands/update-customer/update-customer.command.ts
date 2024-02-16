import { ICommand } from '@nestjs/cqrs';

export class UpdateCustomerCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly businessName: string,
  ) {}
}
