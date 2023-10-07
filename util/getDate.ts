import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

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

export const getDiffDate = (date: string) => {
  const today = dayjs().format('YYYY-MM-DD');
  const diffDate = dayjs(date).diff(today, 'day');
  return diffDate;
};

export const getRelativeTime = (date: string | Date) => {
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
      return dayjs(date).add(1, 'day').fromNow();
  }
};

export const getFormattedDate = (
  date: string | Date,
  format: 'YYYY-MM-DD' | 'YYYY년 MM월 DD일' | 'YYYY.MM.DD'
) => dayjs(date).format(format);
