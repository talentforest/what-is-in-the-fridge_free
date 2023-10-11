export const getDateToken = (expiredDate: string) => {
  const expiredDateToken = [
    expiredDate.slice(2, 3),
    expiredDate.slice(3, 4),
    expiredDate.slice(5, 6),
    expiredDate.slice(6, 7),
    expiredDate.slice(8, 9),
    expiredDate.slice(9, 10),
  ];
  return expiredDateToken;
};
