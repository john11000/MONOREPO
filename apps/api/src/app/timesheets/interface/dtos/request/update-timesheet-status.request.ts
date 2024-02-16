import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { TimesheetStatus } from '../../../domain/constants/status.constant';

export class UpdateTimesheetStatusRequestDto {
  @ApiProperty({
    description: 'Timesheet status',
    example: TimesheetStatus.APPROVED,
  })
  @IsEnum(TimesheetStatus, {
    message: `Status must be one of the following values: ${Object.values(TimesheetStatus).join(', ')}`,
  })
  status: string;
}
