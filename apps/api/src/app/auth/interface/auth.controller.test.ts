import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { QueryBus } from '@nestjs/cqrs';
import { LoginRequestDto } from './dtos/request';
import { LoginResponseDto } from './dtos/response';
import { LoginQuery } from '../application/queries/login/login.query';

describe('AuthController', () => {
  let controller: AuthController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('login', () => {
    it('should return the login response', async () => {
      const loginDto: LoginRequestDto = {
        email: 'test@example.com',
        password: 'password',
      };

      const loginResponse: LoginResponseDto = {
        accessToken: 'token',
        role: 'role',
        email: 'test@example.com',
      };

      jest
        .spyOn(queryBus, 'execute')
        .mockImplementationOnce(() => Promise.resolve(loginResponse));

      const result = await controller.login(loginDto);

      expect(result).toEqual(loginResponse);
      expect(queryBus.execute).toHaveBeenCalledWith(
        new LoginQuery(loginDto.email, loginDto.password),
      );
    });
  });
});
