import * as bcrypt from 'bcrypt';

import { UserLoggedInEvent } from './events/user-logged-in.event';
import { UserImplementation } from './user';

describe('UserImplementation', () => {
  let user: UserImplementation;

  beforeEach(() => {
    const properties = {
      id: '1',
      email: 'test@test.co',
      password: bcrypt.hashSync('password', 10),
      role: 'user',
      customerId: '123',
    };

    user = new UserImplementation(properties);
  });

  it('should validate the password correctly', async () => {
    const validPassword = 'password';
    const invalidPassword = 'wrongpassword';

    const isValid = await user.isPasswordValid(validPassword);
    expect(isValid).toBe(true);

    const isInvalid = await user.isPasswordValid(invalidPassword);
    expect(isInvalid).toBe(false);
  });

  it('should generate a token correctly', async () => {
    const token = await user.generateToken();

    expect(token).toBeDefined();
  });

  it('should apply a UserLoggedInEvent when login is successful', () => {
    const email = 'test@test.co';

    user.loginSuccess();

    expect(user.getUncommittedEvents()).toEqual([new UserLoggedInEvent(email)]);
  });
});
