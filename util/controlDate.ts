import { formattedToday } from './getDate';

export type Operator = 'add' | 'minus';

export const controlDay = (operator: Operator, date: Date) => {
  const newDate = new Date(date);
  const calculatedDate =
    operator === 'add'
      ? date.getDate() + 1
      : operator === 'minus'
      ? date.getDate() - 1
      : date.getDate();
  newDate.setDate(calculatedDate);

  return newDate;
};

export const controlWeek = (operator: Operator, date: Date) => {
  const newDate = new Date(date);
  const calculatedDate =
    operator === 'add'
      ? date.getDate() + 7
      : operator === 'minus'
      ? date.getDate() - 7
      : date.getDate();
  newDate.setDate(calculatedDate);

  return newDate;
};

export const controlMonth = (operator: Operator, date: Date) => {
  const newDate = new Date(date);
  const calculatedMonth =
    operator === 'add'
      ? date.getMonth() + 1
      : operator === 'minus'
      ? date.getMonth() - 1
      : date.getMonth();
  newDate.setMonth(calculatedMonth);

  return newDate;
};

export const controlYear = (operator: Operator, date: Date) => {
  const newDate = new Date(date);
  const calculatedYear =
    operator === 'add'
      ? date.getFullYear() + 1
      : operator === 'minus'
      ? date.getFullYear() - 1
      : date.getFullYear();
  newDate.setFullYear(calculatedYear);

  return newDate;
};
