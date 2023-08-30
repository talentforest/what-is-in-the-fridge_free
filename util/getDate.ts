import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getRelativeTime = (expiryDate: string) => {
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const today = dayjs().format('YYYY-MM-DD');
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
  const date = dayjs(expiryDate).format('YYYY-MM-DD');

  if (yesterday === date) return '어제';
  if (today === date) return '오늘';
  if (tomorrow === date) return '내일';
  return dayjs(expiryDate).fromNow();
};

export const getFormattedDate = (
  date: string | Date,
  format = 'YYYY-MM-DD'
) => {
  return dayjs(date).format(format);
};
