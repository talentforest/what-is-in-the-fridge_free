export const addDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + 1);
  return newDate;
};

export const addWeek = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + 7);
  return newDate;
};

export const addMonth = (date: Date) => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
};

export const addYear = (date: Date) => {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + 1);
  return newDate;
};
