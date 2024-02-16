import { AggregateRoot } from '@nestjs/cqrs';

import { Payload } from '../interface/types';
import { UserLoggedInEvent } from './events/user-logged-in.event';

import { comparePasswords, generateJwt } from '@ocmi/api/libs/utils';

export type UserEssentialProperties = Readonly<
  Required<{
    id: string;
    email: string;
    password: string;
    role: string;
  }>
>;

export type UserOptionalProperties = Readonly<
  Partial<{
    customerId: string;
  }>
>;

export type UserProperties = UserEssentialProperties & UserOptionalProperties;

export interface User {
  isPasswordValid: (password: string) => boolean;
  generateToken: () => Promise<string>;
  loginSuccess: () => void;
  commit: () => void;
  getRole: () => string;
  getEmail: () => string;
}

export class UserImplementation extends AggregateRoot implements User {
  private readonly id: string;
  private email: string;
  private password: string;
  private role: string;
  private customerId: string | null;

  constructor(private readonly properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  isPasswordValid(password: string) {
    return comparePasswords(password, this.password);
  }

  async generateToken() {
    const payload: Payload = {
      id: this.id,
      email: this.email,
      role: this.role,
      customerId: this.customerId,
    };

    return generateJwt(payload);
  }

  loginSuccess() {
    this.apply(new UserLoggedInEvent(this.email));
  }

  getRole() {
    return this.role;
  }

  getEmail() {
    return this.email;
  }
}
