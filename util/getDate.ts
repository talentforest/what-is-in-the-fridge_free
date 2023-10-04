import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

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
) => {
  return dayjs(date).format(format);
};
