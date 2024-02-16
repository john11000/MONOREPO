import { PayType } from './pay-type.constant';

export const MinPayRate = {
  [PayType.HOURLY]: 12,
  [PayType.SALARY]: 480,
};
