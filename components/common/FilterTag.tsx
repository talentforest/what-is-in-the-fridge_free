import { Text, TouchableOpacity } from './native-component';
import { View } from 'react-native';
import { Filter, FilterObj } from '../../util';
import { GRAY, LIGHT_GRAY } from '../../constant/colors';
import { useHandleFilter } from '../../hooks';

import Icon from './native-component/Icon';
import tw from 'twrnc';

export const INACTIVE_COLOR = 'bg-white border-slate-200 text-slate-600';
export const DEFAULT_COLOR = 'bg-blue-100 border-blue-200 text-blue-600';
export const EXPIRED_COLOR = 'bg-red-50 border-red-200 text-red-600';
export const LEFT_3_DAYS_COLOR = 'bg-amber-50 border-amber-200 text-amber-600';

interface Props {
  onFilterPress: (filter: Filter) => void;
  filterObj: FilterObj;
  active: boolean;
  iconColor: string;
  length?: number;
}

export default function FilterTag({
  onFilterPress,
  filterObj,
  length,
  iconColor,
  active,
}: Props) {
  const { currentFilter, isCategoryFilter } = useHandleFilter();
  const { filter, icon } = filterObj;

  const ACTIVE_COLOR =
    currentFilter === '유통기한 3일 이내'
      ? LEFT_3_DAYS_COLOR
      : currentFilter === '유통기한 만료'
      ? EXPIRED_COLOR
      : DEFAULT_COLOR;

  const color = active ? ACTIVE_COLOR : INACTIVE_COLOR;

  return (
    <TouchableOpacity
      onPress={() => onFilterPress(filter)}
      style={tw`shadow-md bg-white flex-row items-center border px-2.5 py-1 gap-1.5 rounded-full ${color}`}
    >
      {icon !== '' && (
        <View style={tw`-mx-0.5`}>
          <Icon
            type='MaterialCommunityIcons'
            name={icon}
            size={14}
            color={active ? iconColor : LIGHT_GRAY}
          />
        </View>
      )}

      <Text style={tw`text-sm ${color}`}>{filter}</Text>
      {filter !== '카테고리' && (
        <Text style={tw`text-sm ${color}`}>{`${length}`}개</Text>
      )}

      {filter === '카테고리' && (
        <>
          {isCategoryFilter && (
            <>
              <Text style={tw`text-sm ${color}`}>: {currentFilter}</Text>
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
