import moment from 'moment';
import 'moment/locale/ko';

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

export function getLeftDays(expiryDate: string) {
  const diffDate =
    new Date(expiryDate).getTime() - new Date(getTodayIsoDateKr()).getTime();
  const leftDays = diffDate / (1000 * 60 * 60 * 24);

  return leftDays;
}

export const getRelativeDate = (days: number) => {
  const now = moment().add(9, 'hours');
  const futureDate = now.add(days, 'days');
  const relativeTime = futureDate.fromNow(false);

  return relativeTime;
};

export function getLocaleDate(date: string) {
  return new Date(date).toLocaleDateString('ko');
}

export const getDateKr = (date: string) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  return `${year}년 ${month}월 ${day}일`;
};
