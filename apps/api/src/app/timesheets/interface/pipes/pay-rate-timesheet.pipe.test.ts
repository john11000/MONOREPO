import { BadRequestException } from '@nestjs/common';
import { PayRateTimesheetPipe } from './pay-rate-timesheet.pipe';
import { PayType } from '@ocmi/api/app/employees/interface/constants';
import { CreateTimesheetRequestDto } from '../dtos/request';

describe('PayRateTimesheetPipe', () => {
  let pipe: PayRateTimesheetPipe;

  beforeEach(() => {
    pipe = new PayRateTimesheetPipe();
  });

  it('should return the value if pay rate is valid for hourly employees', () => {
    const value = {
      entries: [
        { employeeName: 'John Doe', payType: PayType.HOURLY, payRate: 25 },
        { employeeName: 'Jane Smith', payType: PayType.HOURLY, payRate: 30 },
      ],
    } as CreateTimesheetRequestDto;

    expect(pipe.transform(value)).toEqual(value);
  });

  it('should return the value if pay rate is valid for salary employees', () => {
    const value = {
      entries: [
        { employeeName: 'John Doe', payType: PayType.SALARY, payRate: 50000 },
        { employeeName: 'Jane Smith', payType: PayType.SALARY, payRate: 60000 },
      ],
    } as CreateTimesheetRequestDto;
    expect(pipe.transform(value)).toEqual(value);
  });

  it('should throw BadRequestException if pay rate is invalid for hourly employees', () => {
    const value = {
      entries: [
        { employeeName: 'John Doe', payType: PayType.HOURLY, payRate: 10 },
        { employeeName: 'Jane Smith', payType: PayType.HOURLY, payRate: 5 },
      ],
    } as CreateTimesheetRequestDto;

    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if pay rate is invalid for salary employees', () => {
    const value = {
      entries: [
        { employeeName: 'John Doe', payType: PayType.SALARY, payRate: 300 },
        { employeeName: 'Jane Smith', payType: PayType.SALARY, payRate: 200 },
      ],
    } as CreateTimesheetRequestDto;

    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });
});
