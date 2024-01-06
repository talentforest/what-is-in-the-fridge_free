import { getFormattedDate } from './getDate';

export const getLeftDays = (expiryDate: string) => {
  const diffDate =
    new Date(expiryDate).getTime() -
    new Date(getFormattedDate(new Date(), 'YYYY-MM-DD')).getTime();

  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return Math.round(leftDays);
};
