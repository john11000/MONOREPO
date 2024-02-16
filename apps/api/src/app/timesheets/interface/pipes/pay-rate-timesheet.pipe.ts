import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { CreateTimesheetRequestDto } from '../dtos/request';
import {
  MinPayRate,
  PayType,
} from '@ocmi/api/app/employees/interface/constants';

@Injectable()
export class PayRateTimesheetPipe implements PipeTransform {
  transform(value: CreateTimesheetRequestDto) {
    const timesheetEntries = value.entries;

    timesheetEntries.forEach((entry) => {
      if (
        (entry.payType === PayType.HOURLY &&
          entry.payRate < MinPayRate[PayType.HOURLY]) ||
        (entry.payType === PayType.SALARY &&
          entry.payRate < MinPayRate[PayType.SALARY])
      ) {
        throw new BadRequestException(
          `Pay rate for ${entry.employeeName} must be at least $${MinPayRate[entry.payType]}`,
        );
      }
    });

    return value;
  }
}
