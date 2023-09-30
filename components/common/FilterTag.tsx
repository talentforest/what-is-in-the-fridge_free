import { Text, TouchableOpacity } from './native-component';
import { View } from 'react-native';
import { Filter, FilterObj } from '../../util';
import { GRAY } from '../../constant/colors';
import { useHandleFilter } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';

import Icon from './native-component/Icon';
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
  iconColor: string;
  length?: number;
  categoryFilter?: boolean;
}

export default function FilterTag({
  onFilterPress,
  filterObj,
  length,
  iconColor,
  active,
  categoryFilter,
}: Props) {
  const { filter, icon } = filterObj;

  const { currentFilter } = useHandleFilter();

  const activeColorByFilter =
    currentFilter === '소비기한 3일 이내'
      ? LEFT_3_DAYS_COLOR
      : currentFilter === '소비기한 만료'
      ? EXPIRED_COLOR
      : ACTIVE_COLOR;

  const color = active
    ? activeColorByFilter
    : length === 0 && categoryFilter
    ? DISABLED_COLOR
    : INACTIVE_COLOR;

  return (
    <TouchableOpacity
      onPress={() => onFilterPress(filter)}
      style={tw.style(
        `bg-white flex-row items-center border px-2.5 py-1 gap-1.5 rounded-full ${color}`,
        shadowStyle(3)
      )}
      disabled={length === 0 && categoryFilter}
    >
      {icon !== '' && (
        <View>
          <Icon
            type='MaterialCommunityIcons'
            name={icon}
            size={14}
            color={
              active
                ? iconColor
                : length === 0 && categoryFilter
                ? '#e2e2e2'
                : iconColor
            }
          />
        </View>
      )}

      <Text style={tw`text-sm ${color}`}>{filter}</Text>
      {filter !== '카테고리' && (
        <Text style={tw`text-sm ${color}`}>{`${length}`}개</Text>
      )}

      {filter === '카테고리' && (
        <>
          {categoryFilter && (
            <>
              <Text style={tw`text-sm ${color}`}>: {filter}</Text>
              <Text style={tw`text-sm ${color}`}>{`${length}`}개</Text>
            </>
          )}
          <Icon
            name='chevron-down'
            type='Ionicons'
            size={13}
            color={active ? iconColor : GRAY}
          />
        </>
      )}
    </TouchableOpacity>
  );
}
