import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
  Param,
  Delete,
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
import { Payload } from '../../auth/interface/types';

import { ResponseDescription } from './constants';
import {
  CreateEmployeeRequestDto,
  UpdateEmployeeRequestDto,
} from './dto/request';
import { FindAllEmployeesResponseDto } from './dto/response';
import { PayRatePipe } from './pipes/pay-rate.pipe';

import { CreateEmployeeCommand } from '../application/commands/create-employee/create-employee.command';
import { FindAllEmployeesResult } from '../application/queries/find-all-employees/find-all-employees.result';
import { FindAllEmployeesQuery } from '../application/queries/find-all-employees/find-all-employees.query';
import { UpdateEmployeeCommand } from '../application/commands/update-employee/update-employee.command';
import { DeleteEmployeeCommand } from '../application/commands/delete-employee/delete-employee.command';

@ApiBearerAuth()
@ApiTags('employees')
@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.Customer)
export class EmployeeController {
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
  async createEmployee(
    @Body(PayRatePipe) createEmployeeDto: CreateEmployeeRequestDto,
    @Req() request: Request & { user: Payload },
  ): Promise<void> {
    const customerId = request.user.customerId;

    const { name, payType, payRate } = createEmployeeDto;

    const command = new CreateEmployeeCommand(
      name,
      payType,
      payRate,
      customerId,
    );

    await this.commandBus.execute<CreateEmployeeCommand, void>(command);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
    type: FindAllEmployeesResponseDto,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findAllEmployees(
    @Req() request: Request & { user: Payload },
  ): Promise<FindAllEmployeesResponseDto> {
    const customerId = request.user.customerId;

    const employees = await this.queryBus.execute<
      FindAllEmployeesQuery,
      FindAllEmployeesResult
    >(new FindAllEmployeesQuery(customerId));

    return employees;
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
  async updateEmployee(
    @Body(PayRatePipe) updateEmployeeDto: UpdateEmployeeRequestDto,
    @Req() request: Request & { user: Payload },
    @Param('id') id: string,
  ): Promise<void> {
    const customerId = request.user.customerId;

    const { name, payType, payRate } = updateEmployeeDto;

    const command = new UpdateEmployeeCommand(
      id,
      name,
      payType,
      payRate,
      customerId,
    );

    await this.commandBus.execute<UpdateEmployeeCommand, void>(command);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.DELETED,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async deleteEmployee(
    @Req() request: Request & { user: Payload },
    @Param('id') id: string,
  ): Promise<void> {
    const customerId = request.user.customerId;

    const command = new DeleteEmployeeCommand(id, customerId);

    await this.commandBus.execute<DeleteEmployeeCommand, void>(command);
  }
}
