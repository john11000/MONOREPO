import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../../constants';
import { LoginQuery } from './login.query';

import { LoginResponseDto } from '../../../interface/dtos/response';
import { ErrorMessage } from '../../../domain/constants';
import { UserRepository } from '../../../domain/user.repository';

@QueryHandler(LoginQuery)
export class LoginQueryHandler
  implements IQueryHandler<LoginQuery, LoginResponseDto>
{
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: LoginQuery) {
    const user = await this.userRepository.findOne({ email: query.email });

    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    if (!user.isPasswordValid(query.password)) {
      throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED);
    }

    const accessToken = await user.generateToken();

    user.loginSuccess();

    user.commit();

    return { accessToken, role: user.getRole(), email: user.getEmail() };
  }
}
