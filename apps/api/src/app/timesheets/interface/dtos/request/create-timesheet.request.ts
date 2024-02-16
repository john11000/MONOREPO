import { ApiProperty } from '@nestjs/swagger';
import { PayType } from '@ocmi/api/app/employees/interface/constants';

import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Entry {
  @ApiProperty({
    type: String,
    description: 'The name of the employee',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Employee Name is required' })
  @IsString({ message: 'Employee Name must be a string' })
  employeeName: string;

  @IsEnum(PayType, {
    message: `Pay Type must be either ${PayType.HOURLY} or ${PayType.SALARY}`,
  })
  @ApiProperty({
    type: String,
    description: 'The type of pay',
    example: PayType.HOURLY,
  })
  @IsNotEmpty({ message: 'Pay Type is required' })
  payType: string;

  @ApiProperty({
    type: Number,
    description: 'The pay rate',
    example: 10,
  })
  @IsNotEmpty({ message: 'Pay Rate is required' })
  @IsNumber({}, { message: 'Pay Rate must be a number' })
  payRate: number;

  @ApiProperty({
    type: Number,
    description: 'The number of hours worked',
    example: 8,
  })
  @ValidateIf((o) => o.payType === PayType.HOURLY)
  @IsNotEmpty({ message: 'Hours Worked is required' })
  @IsNumber({}, { message: 'Hours Worked must be a number' })
  hours: number;

  @ApiProperty({
    type: Number,
    description: 'The amount of money paid to the employee',
    example: 100,
  })
  @IsNotEmpty({ message: 'Amount Paid is required' })
  @IsNumber({}, { message: 'Amount Paid must be a number' })
  grossWages: number;
}

export class CreateTimesheetRequestDto {
  @ApiProperty({
    type: String,
    description:
      'The date  when a payment is issued to an employee for work done during a Pay Period (YYYY/MM/DD)',
    example: '2024/01/14',
  })
  @IsNotEmpty({ message: 'Check date is required' })
  @IsString({ message: 'Check date must be a string. Format: YYYY/MM/DD' })
  checkDate: string;

  @ApiProperty({
    type: String,
    description: 'The date when the Pay Period starts (YYYY/MM/DD)',
    example: '2023/12/21',
  })
  @IsNotEmpty({ message: 'Pay Period Start is required' })
  @IsString({ message: 'Pay Period Start must be a string Format: YYYY/MM/DD' })
  payPeriodStart: string;

  @ApiProperty({
    type: String,
    description: 'The date when the Pay Period ends (YYYY/MM/DD)',
    example: '2023/12/28',
  })
  @IsNotEmpty({ message: 'Pay Period End is required' })
  @IsString({ message: 'Pay Period End must be a string Format: YYYY/MM/DD' })
  payPeriodEnd: string;

  @ApiProperty({ type: [Entry] })
  @IsArray({ message: 'Entries must be an array' })
  @ValidateNested({ each: true })
  @Type(() => Entry)
  entries: Entry[];
}
