import {
  Controller,
  Get,
  Param,
  UseGuards,
  HttpStatus,
  Body,
  Put,
  Post,
  Req,
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
  CreateTimesheetRequestDto,
  UpdateTimesheetStatusRequestDto,
  AddNoteRequestDto,
} from './dtos/request';
import { FindAllTimesheetsResponseDto } from './dtos/response';

import { CreateTimesheetCommand } from '../application/commands/create-timesheet/create-timesheet.command';
import { PayRateTimesheetPipe } from './pipes/pay-rate-timesheet.pipe';
import { FindAllTimesheetsQuery } from '@ocmi/api/app/timesheets/application/queries/find-all-timesheets/find-all-timesheets.query';
import { UpdateTimesheetStatusCommand } from '../application/commands/update-timesheet-status/update-timesheet-status.command';
import { AddNotesCommand } from '../application/commands/add-notes/add-notes.command';

@ApiTags('timesheets')
@ApiBearerAuth()
@Controller('timesheets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimesheetController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @RolesDecorator(Roles.Customer)
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
  async createTimesheet(
    @Body(PayRateTimesheetPipe)
    createTimesheetRequestDto: CreateTimesheetRequestDto,
    @Req() req: Request & { user: Payload },
  ): Promise<void> {
    const customerId = req.user.customerId;
    const checkDate = createTimesheetRequestDto.checkDate;
    const payPeriodStart = createTimesheetRequestDto.payPeriodStart;
    const payPeriodEnd = createTimesheetRequestDto.payPeriodEnd;
    const entries = createTimesheetRequestDto.entries;

    return this.commandBus.execute(
      new CreateTimesheetCommand(
        customerId,
        checkDate,
        payPeriodStart,
        payPeriodEnd,
        entries,
      ),
    );
  }

  @RolesDecorator(Roles.Admin, Roles.Customer)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
    type: FindAllTimesheetsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findAllTimesheets(
    @Req() req: Request & { user: Payload },
  ): Promise<FindAllTimesheetsResponseDto> {
    const customerId =
      req.user.role === Roles.Admin ? null : req.user.customerId;

    return this.queryBus.execute(new FindAllTimesheetsQuery(customerId));
  }

  @RolesDecorator(Roles.Admin)
  @Put(':id/status')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async updateTimesheetStatus(
    @Param('id') id: string,
    @Body() updateTimesheetStatusRequestDto: UpdateTimesheetStatusRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateTimesheetStatusCommand(
        id,
        updateTimesheetStatusRequestDto.status,
      ),
    );
  }

  @RolesDecorator(Roles.Admin)
  @Put(':id/note')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async addNote(
    @Param('id') id: string,
    @Body() addNotesRequestDto: AddNoteRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new AddNotesCommand(id, addNotesRequestDto.notes),
    );
  }
}
