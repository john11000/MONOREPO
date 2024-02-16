import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should allow access when user has required role', () => {
    const context: ExecutionContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: {
            role: 'admin',
          },
        }),
      }),
      getArgs: jest.fn(),
      getType: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    };

    reflector.getAllAndOverride = jest.fn().mockReturnValue(['admin']);

    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should deny access when user does not have required role', () => {
    const context: ExecutionContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: {
            role: 'user',
          },
        }),
      }),
      getArgs: jest.fn(),
      getType: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    };

    reflector.getAllAndOverride = jest.fn().mockReturnValue(['admin']);

    const result = guard.canActivate(context);

    expect(result).toBe(false);
  });
});
