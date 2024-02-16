import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// Auth
import { JwtAuthGuard, RolesGuard } from '../../auth/interface/guards';
import { RolesDecorator } from '../../auth/interface/decorators';
import { Roles } from '../../auth/interface/roles/constants';

import { ResponseDescription } from './constants';
import {
  CreateCustomerRequestDto,
  UpdateCustomerRequestDto,
} from './dtos/request';
import { FindAllCustomersResponseDto } from './dtos/response';

import { CreateCustomerCommand } from '../application/commands/create-customer/create-customer.command';
import { FindAllCustomersQuery } from '../application/queries/find-all-customers/find-all-customers.query';
import { FindAllCustomersResult } from '../application/queries/find-all-customers/find-all-customers.result';
import { UpdateCustomerCommand } from '../application/commands/update-customer/update-customer.command';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.Admin)
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ResponseDescription.CREATED,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async createCustomer(
    @Body() createCustomerRequestDto: CreateCustomerRequestDto,
  ) {
    const { businessName, email, password } = createCustomerRequestDto;

    await this.commandBus.execute<CreateCustomerCommand, void>(
      new CreateCustomerCommand(businessName, email, password),
    );
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
    type: FindAllCustomersResponseDto,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findAllCustomers() {
    return await this.queryBus.execute<
      FindAllCustomersQuery,
      FindAllCustomersResult
    >(new FindAllCustomersQuery());
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.UPDATED,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerRequestDto: UpdateCustomerRequestDto,
  ) {
    await this.commandBus.execute<UpdateCustomerCommand, void>(
      new UpdateCustomerCommand(id, updateCustomerRequestDto.businessName),
    );
  }
}
