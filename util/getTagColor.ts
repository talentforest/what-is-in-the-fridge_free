import { Filter } from './filters';
import {
  isExpiredFood,
  isLeftThreeDaysFood,
  isLeftWeekFood,
} from './getLeftDays';

export const DISABLED_BG_COLOR = 'bg-white border-slate-200';
export const DISABLED_TEXT_COLOR = 'text-slate-400';

export const INACTIVE_BG_COLOR = 'bg-white border-slate-200';
export const INACTIVE_TEXT_COLOR = 'text-slate-600';

export const ACTIVE_BG_COLOR = 'bg-blue-100 border-blue-100';
export const ACTIVE_TEXT_COLOR = 'text-blue-700';

export const EXPIRED_BG_COLOR = 'bg-red-100 border-red-100';
export const EXPIRED_TEXT_COLOR = 'text-red-600';

export const LEFT_3_DAYS_BG_COLOR = 'bg-amber-100 border-amber-100';
export const LEFT_3_DAYS_TEXT_COLOR = 'text-amber-600';

export const LEFT_WEEK_BG_COLOR = 'bg-green-100 border-green-100 ';
export const LEFT_WEEK_TEXT_COLOR = 'text-green-600';

const activeBgColorByFilter = (filter: Filter) => {
  return filter === '소비기한 일주일 이내'
    ? LEFT_WEEK_BG_COLOR
    : filter === '소비기한 3일 이내'
    ? LEFT_3_DAYS_BG_COLOR
    : filter === '소비기한 만료'
    ? EXPIRED_BG_COLOR
    : ACTIVE_BG_COLOR;
};

const activeTextColorByFilter = (filter: Filter) => {
  return filter === '소비기한 일주일 이내'
    ? LEFT_WEEK_TEXT_COLOR
    : filter === '소비기한 3일 이내'
    ? LEFT_3_DAYS_TEXT_COLOR
    : filter === '소비기한 만료'
    ? EXPIRED_TEXT_COLOR
    : ACTIVE_TEXT_COLOR;
};

export const getTagColor = (
  filter: Filter,
  active: boolean,
  type?: 'bg' | 'text',
  disabled?: boolean
) => {
  if (type === 'text') {
    return disabled
      ? DISABLED_TEXT_COLOR
      : active
      ? activeTextColorByFilter(filter)
      : INACTIVE_TEXT_COLOR;
  }
  return disabled
    ? DISABLED_BG_COLOR
    : active
    ? activeBgColorByFilter(filter)
    : INACTIVE_BG_COLOR;
};

export const colorByFilter = (
  filter: Filter,
  date: string,
  type: 'bg' | 'text'
) => {
  const active =
    filter === '소비기한 만료'
      ? isExpiredFood(date)
      : filter === '소비기한 3일 이내'
      ? isLeftThreeDaysFood(date)
      : filter === '소비기한 일주일 이내'
      ? isLeftWeekFood(date)
      : false;

  return getTagColor(filter, active, type);
};
