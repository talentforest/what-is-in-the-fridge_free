export const getISODate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
