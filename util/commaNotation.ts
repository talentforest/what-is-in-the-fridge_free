export const comma = (str: string) => {
  return String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
