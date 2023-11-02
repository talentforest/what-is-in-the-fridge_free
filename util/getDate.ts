import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { DateState } from '../screen-component/modal/DateNumInputModal';

const config = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 1 },
    { l: 'yy', d: 'year' },
  ],
  rounding: Math.floor,
};

dayjs.extend(relativeTime, config);
dayjs.locale('ko');
dayjs.extend(updateLocale);

export const formattedToday = dayjs().format('YYYY-MM-DD');

export const getDiffDate = (date: string) => {
  const diffDate = dayjs(date).diff(formattedToday, 'day');
  return diffDate;
};

export const getRelativeTime = (date: string | Date) => {
  if (date === '') return;

  const formatDate = dayjs(date).format('YYYY-MM-DD');
  const diff = getDiffDate(formatDate);

  switch (diff) {
    case -1:
      return '어제';
    case 0:
      return '오늘';
    case 1:
      return '내일';

    default:
      return diff < 0
        ? dayjs(date).fromNow()
        : dayjs(date).add(1, 'day').fromNow();
  }
};

export const getFormattedDate = (
  date: string | Date,
  format: 'YYYY-MM-DD' | 'YY년 MM월 DD일' | 'YY.MM.DD'
) => dayjs(date).format(format);

export const isValidDate = (dateString: string): DateState => {
  const date = new Date(dateString);
  if (
    !(!isNaN(date.getTime()) && dateString === date.toISOString().slice(0, 10))
  ) {
    return { state: 'error', msg: '날짜 형식이 맞지 않아요.' };
  }
  if (getDiffDate(dateString) < 0) {
    return { state: 'error', msg: '소비기한은 오늘 이전일 수 없어요' };
  }

  return { state: 'ok', msg: '' };
};

export const beforePurchaseDate = (
  purchaseDate: string,
  expiredDate: string
) => {
  return new Date(expiredDate).getTime() < new Date(purchaseDate).getTime();
};
