import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import configurations from '@ocmi/api/libs/config/configurations';

import { Payload } from '../types';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: configurations.KEY,
          useValue: {
            jwtSecret: 'test-secret',
          },
        },
      ],
    }).compile();

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate payload', async () => {
    const payload: Payload = {
      email: 'test@test.co',
      id: '1',
      role: 'user',
      customerId: '123',
    };

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual(payload);
  });
});
