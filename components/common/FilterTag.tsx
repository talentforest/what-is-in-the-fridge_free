import { Text, TouchableOpacity } from './native-component';
import { Filter, FilterObj } from '../../util';
import { useHandleFilter } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { Category } from '../../constant/foodCategories';
import { ReactNode } from 'react';

import CategoryIcon from './CategoryIcon';
import tw from 'twrnc';

export const DISABLED_COLOR = 'bg-white border-slate-200 text-slate-400';
export const INACTIVE_COLOR = 'bg-white border-slate-200 text-slate-700';
export const ACTIVE_COLOR = 'bg-blue-100 border-blue-200 text-blue-600';
export const EXPIRED_COLOR = 'bg-red-50 border-red-200 text-red-600';
export const LEFT_3_DAYS_COLOR = 'bg-amber-50 border-amber-200 text-amber-600';

interface Props {
  onFilterPress: (filter: Filter) => void;
  filterObj: FilterObj;
  active: boolean;
  length?: number;
  foodIcon?: boolean;
  children?: ReactNode;
}

export default function FilterTag({
  onFilterPress,
  filterObj,
  length,
  active,
  foodIcon,
  children,
}: Props) {
  const { filter } = filterObj;

  const { currentFilter } = useHandleFilter();

  const activeColorByFilter =
    currentFilter === '소비기한 3일 이내'
      ? LEFT_3_DAYS_COLOR
      : currentFilter === '소비기한 만료'
      ? EXPIRED_COLOR
      : ACTIVE_COLOR;

  const color = active
    ? activeColorByFilter
    : length === 0
    ? DISABLED_COLOR
    : INACTIVE_COLOR;

  return (
    <TouchableOpacity
      onPress={() => onFilterPress(filter)}
      style={tw.style(
        `h-9 min-w-20 bg-white flex-row items-center border px-3 py-1 gap-1.5 rounded-full ${color}`,
        shadowStyle(3)
      )}
      disabled={length === 0}
    >
      {foodIcon && <CategoryIcon category={filter as Category} size={16} />}
      <Text style={tw`text-sm ${color}`}>{filter}</Text>
      <Text style={tw`text-sm ${color}`}>{`${length}`}개</Text>

      {/* chevron-down icon */}
      {children}
    </TouchableOpacity>
  );
}
