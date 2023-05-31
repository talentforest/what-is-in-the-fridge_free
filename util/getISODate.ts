export const getISODate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const todayLocaleDate = new Date().toLocaleDateString('ko');

export const getTodayIsoDateKr = () => {
  const dateArr = todayLocaleDate.slice(0, -1).split('. ');

  const year = dateArr[0];
  const month = dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1];
  const date = dateArr[2].length === 1 ? `0${dateArr[2]}` : dateArr[2];

  return `${year}-${month}-${date}`;
};
