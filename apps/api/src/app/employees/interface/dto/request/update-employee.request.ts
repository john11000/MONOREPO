import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { PayType } from '../../constants';

export class UpdateEmployeeRequestDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ type: String, description: 'The name of the employee' })
  name: string;

  @IsEnum(PayType, { message: 'Pay type must be either hourly or salary' })
  @ApiProperty({
    enum: PayType,
    description: 'The pay type of the employee (hourly or salary)',
  })
  payType: string;

  @IsNumber({}, { message: 'Pay rate must be a number' })
  @ApiProperty({ type: Number, description: 'The pay rate of the employee' })
  payRate: number;
}
