import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { MinPayRate, PayType } from '../constants';

@Injectable()
export class PayRatePipe implements PipeTransform {
  transform(value: { payType: PayType; payRate: number }) {
    if (
      (value.payType === PayType.HOURLY &&
        value.payRate < MinPayRate[PayType.HOURLY]) ||
      (value.payType === PayType.SALARY &&
        value.payRate < MinPayRate[PayType.SALARY])
    ) {
      throw new BadRequestException(
        `Pay rate must be at least $${MinPayRate[value.payType]} for ${value.payType} employees`,
      );
    }

    return value;
  }
}
