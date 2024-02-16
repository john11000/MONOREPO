import { IQuery } from '@nestjs/cqrs';

export class LoginQuery implements IQuery {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}
