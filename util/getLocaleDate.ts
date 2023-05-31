export function getLocaleDate(date: string) {
  return new Date(date).toLocaleDateString('ko');
}

export const getDateKr = (date: string) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  return `${year}년 ${month}월 ${day}일`;
};
