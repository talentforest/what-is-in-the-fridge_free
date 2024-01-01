import { AMBER, GREEN, RED } from '../constant/colors';
import { getFormattedDate } from './getDate';

export const getLeftDays = (expiryDate: string) => {
  const diffDate =
    new Date(expiryDate).getTime() -
    new Date(getFormattedDate(new Date(), 'YYYY-MM-DD')).getTime();

  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return Math.round(leftDays);
};

export const isCautionFood = (expiredDate: string) => {
  return getLeftDays(expiredDate) < 8;
};

export const isExpiredFood = (expiredDate: string) => {
  return 0 > getLeftDays(expiredDate);
};

export const isLeftThreeDaysFood = (expiredDate: string) => {
  return 0 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 4;
};

export const isLeftWeekFood = (expiredDate: string) => {
  return 4 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 8;
};

export const getTWColorByLeftDay = (expiredDate: string) => {
  return isExpiredFood(expiredDate)
    ? 'text-red-600'
    : isLeftThreeDaysFood(expiredDate)
    ? 'text-amber-500'
    : isLeftWeekFood(expiredDate)
    ? 'text-green-600'
    : 'text-green-600';
};

export const getColorByLeftDay = (expiredDate: string) => {
  return isExpiredFood(expiredDate)
    ? RED
    : isLeftThreeDaysFood(expiredDate)
    ? AMBER
    : isLeftWeekFood(expiredDate)
    ? GREEN
    : GREEN;
};
