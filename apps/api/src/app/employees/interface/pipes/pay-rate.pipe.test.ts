import { BadRequestException } from '@nestjs/common';
import { PayRatePipe } from './pay-rate.pipe';
import { PayType } from '../constants/pay-type.constant';

describe('PayRatePipe', () => {
  let pipe: PayRatePipe;

  beforeEach(() => {
    pipe = new PayRatePipe();
  });

  it('should return the value if pay rate is valid for hourly employees', () => {
    const value = { payType: PayType.HOURLY, payRate: 25 };
    expect(pipe.transform(value)).toEqual(value);
  });

  it('should return the value if pay rate is valid for salary employees', () => {
    const value = { payType: PayType.SALARY, payRate: 50000 };
    expect(pipe.transform(value)).toEqual(value);
  });

  it('should throw BadRequestException if pay rate is invalid for hourly employees', () => {
    const value = { payType: PayType.HOURLY, payRate: 10 };

    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if pay rate is invalid for salary employees', () => {
    const value = { payType: PayType.SALARY, payRate: 300 };

    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });
});
