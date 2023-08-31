import { getFormattedDate } from './getDate';

export const getLeftDays = (expiryDate: string) => {
  const diffDate =
    new Date(expiryDate).getTime() -
    new Date(getFormattedDate(new Date())).getTime();

  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return Math.round(leftDays);
};

export const expired = (expiredDate: string) => {
  return 0 > getLeftDays(expiredDate);
};

export const leftThreeDays = (expiredDate: string) => {
  return 0 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 4;
};
