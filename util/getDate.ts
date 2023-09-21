import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getDiffDate = (date: string) => {
  return dayjs(date).diff(dayjs(), 'day', true);
};

export const getRelativeTime = (date: string | Date) => {
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const today = dayjs().format('YYYY-MM-DD');
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
  const formatDate = dayjs(date).format('YYYY-MM-DD');

  if (yesterday === formatDate) return '어제';
  if (today === formatDate) return '오늘';
  if (tomorrow === formatDate) return '내일';

  return dayjs(date).fromNow();
};

export const getFormattedDate = (
  date: string | Date,
  format: 'YYYY-MM-DD' | 'YYYY년 MM월 DD일' | 'YYYY.MM.DD'
) => {
  return dayjs(date).format(format);
};
