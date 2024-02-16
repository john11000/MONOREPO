import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserFactory } from './user.factory';
import { EventPublisher } from '@nestjs/cqrs';

import { UserImplementation } from './user';

describe('UserFactory', () => {
  let userFactory: UserFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    userFactory = module.get<UserFactory>(UserFactory);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  it('should reconstitute a user with the given properties', () => {
    const props = {
      id: '1',
      email: 'test@test.co',
      password: bcrypt.hashSync('password', 10),
      role: 'user',
      customerId: '123',
    };

    jest
      .spyOn(eventPublisher, 'mergeObjectContext')
      .mockReturnValue(new UserImplementation(props));

    const user = userFactory.reconstituteUser(props);

    expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
      new UserImplementation(props),
    );

    expect(user).toBeDefined();
  });
});
