import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getDiffDate = (date: string) => {
  const today = dayjs().format('YYYY-MM-DD');
  const formatDate = dayjs(date).format('YYYY-MM-DD');
  if (today === formatDate) return '오늘';

  const diffDay = dayjs(date).diff(dayjs(), 'day');
  return diffDay;
};

export const getRelativeTime = (date: string) => {
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
  format?: 'YYYY-MM-DD' | 'YYYY년 MM월 DD일'
) => {
  if (!format) return dayjs(date).format('YYYY-MM-DD');
  return dayjs(date).format('YYYY년 MM월 DD일');
};
