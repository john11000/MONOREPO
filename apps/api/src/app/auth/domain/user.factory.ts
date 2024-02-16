import { Injectable, Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { UserImplementation, User, UserProperties } from './user';

@Injectable()
export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly publisher: EventPublisher,
  ) {}
  reconstituteUser(props: UserProperties): User {
    return this.publisher.mergeObjectContext(
      new UserImplementation({
        id: props.id,
        email: props.email,
        password: props.password,
        role: props.role,
        customerId: props.customerId,
      }),
    );
  }
}
