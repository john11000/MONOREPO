import { ICommand } from '@nestjs/cqrs';

export class CreateCustomerCommand implements ICommand {
  constructor(
    readonly businessName: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
