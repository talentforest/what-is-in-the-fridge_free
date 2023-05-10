import { getISODate } from './getISODate';

export const today = getISODate(new Date());

export function getLeftDays(expiryDate: string) {
  const diffDate = new Date(expiryDate).getTime() - new Date(today).getTime();
  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return leftDays;
}
