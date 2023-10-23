import { getFormattedDate } from './getDate';

export const getLeftDays = (expiryDate: string) => {
  const diffDate =
    new Date(expiryDate).getTime() -
    new Date(getFormattedDate(new Date(), 'YYYY-MM-DD')).getTime();

  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return Math.round(leftDays);
};

export const expired = (expiredDate: string) => {
  return 0 > getLeftDays(expiredDate);
};

export const leftThreeDays = (expiredDate: string) => {
  return 0 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 4;
};

export const leftWeek = (expiredDate: string) => {
  return 4 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 8;
};

export const getTWColorByLeftDay = (expiredDate: string) => {
  return expired(expiredDate)
    ? 'text-red-600'
    : leftThreeDays(expiredDate)
    ? 'text-amber-500'
    : leftWeek(expiredDate)
    ? 'text-green-600'
    : 'text-green-600';
};

export const getColorByLeftDay = (expiredDate: string) => {
  return expired(expiredDate)
    ? 'red'
    : leftThreeDays(expiredDate)
    ? 'amber'
    : leftWeek(expiredDate)
    ? 'green'
    : 'green';
};
