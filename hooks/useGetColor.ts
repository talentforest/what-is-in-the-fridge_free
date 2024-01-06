import { AMBER, GREEN, RED } from '../constant/colors';
import { Filter } from '../util';
import { useFindFood } from './useFindFood';

export const DISABLED_BG_COLOR = 'bg-white border-slate-200';
export const DISABLED_TEXT_COLOR = 'text-slate-400';

export const INACTIVE_BG_COLOR = 'bg-white border-slate-200';
export const INACTIVE_TEXT_COLOR = 'text-slate-600';

export const ACTIVE_BG_COLOR = 'bg-blue-100 border-blue-200';
export const ACTIVE_TEXT_COLOR = 'text-blue-700';

export const EXPIRED_BG_COLOR = 'bg-red-100 border-red-200';
export const EXPIRED_TEXT_COLOR = 'text-red-600';

export const LEFT_3_DAYS_BG_COLOR = 'bg-amber-100 border-amber-200';
export const LEFT_3_DAYS_TEXT_COLOR = 'text-amber-600';

export const useGetColor = () => {
  const { isExpiredFood, isExpiredSoonFood } = useFindFood();

  const activeBgColorByFilter = (filter: Filter) => {
    return filter === '소비기한 임박'
      ? LEFT_3_DAYS_BG_COLOR
      : filter === '소비기한 만료'
      ? EXPIRED_BG_COLOR
      : ACTIVE_BG_COLOR;
  };

  const activeTextColorByFilter = (filter: Filter) => {
    return filter === '소비기한 임박'
      ? LEFT_3_DAYS_TEXT_COLOR
      : filter === '소비기한 만료'
      ? EXPIRED_TEXT_COLOR
      : ACTIVE_TEXT_COLOR;
  };

  const getFilterColor = (
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

  const getTWColorByLeftDay = (expiredDate: string) => {
    return isExpiredFood(expiredDate)
      ? 'text-red-600'
      : isExpiredSoonFood(expiredDate)
      ? 'text-amber-500'
      : 'text-green-600';
  };

  const getHexColorByLeftDay = (expiredDate: string) => {
    return isExpiredFood(expiredDate)
      ? RED
      : isExpiredSoonFood(expiredDate)
      ? AMBER
      : GREEN;
  };

  const colorByFilter = (filter: Filter, date: string, type: 'bg' | 'text') => {
    const active =
      filter === '소비기한 만료'
        ? isExpiredFood(date)
        : filter === '소비기한 임박'
        ? isExpiredSoonFood(date)
        : false;

    return getFilterColor(filter, active, type);
  };

  return {
    getHexColorByLeftDay,
    getTWColorByLeftDay,
    getFilterColor,
    colorByFilter,
  };
};
