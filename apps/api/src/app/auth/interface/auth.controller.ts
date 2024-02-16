import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { LoginRequestDto } from './dtos/request';
import { LoginResponseDto } from './dtos/response';
import { ResponseDescription } from './constants';

import { LoginQuery } from '../application/queries/login/login.query';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ResponseDescription.CREATED,
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.queryBus.execute<LoginQuery, LoginResponseDto>(
      new LoginQuery(loginDto.email, loginDto.password),
    );
  }
}
