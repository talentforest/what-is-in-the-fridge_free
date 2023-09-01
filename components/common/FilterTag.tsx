import { Text, TouchableOpacity } from './native-component';
import { View } from 'react-native';
import { Filter, FilterObj } from '../../util';
import {
  BLUE,
  DEEP_YELLOW,
  GRAY,
  LIGHT_GRAY,
  RED,
} from '../../constant/colors';

import Icon from './native-component/Icon';
import tw from 'twrnc';

export const INACTIVE_COLOR = 'bg-white border-slate-600 text-slate-600';
export const DEFAULT_COLOR = 'bg-blue-100 border-blue-600 text-blue-600';
export const EXPIRED_COLOR = 'bg-red-50 border-red-400 text-red-600';
export const LEFT_3_DAYS_COLOR = 'bg-amber-50 border-amber-400 text-amber-600';

interface Props {
  onFilterPress: (filter: Filter) => void;
  filterObj: FilterObj;
  currentFilter: Filter;
  length?: number;
  byCategoryActive?: boolean;
}

export default function FilterTag({
  onFilterPress,
  filterObj,
  length,
  currentFilter,
  byCategoryActive,
}: Props) {
  const { filter, icon } = filterObj;

  const matchedFilter = filter === currentFilter;

  const ACTIVE_COLOR =
    currentFilter === '유통기한 3일 이내'
      ? LEFT_3_DAYS_COLOR
      : currentFilter === '유통기한 지남'
      ? EXPIRED_COLOR
      : DEFAULT_COLOR;

  const color =
    matchedFilter || byCategoryActive ? ACTIVE_COLOR : INACTIVE_COLOR;

  return (
    <TouchableOpacity
      onPress={() => onFilterPress(filter)}
      style={tw`flex-row items-center border px-2.5 py-1 gap-1 rounded-full ${color}`}
    >
      <View style={tw`-mx-0.5`}>
        {icon !== '' && (
          <Icon
            type='MaterialCommunityIcons'
            name={icon}
            size={13}
            color={
              matchedFilter || byCategoryActive
                ? filter === '유통기한 3일 이내'
                  ? DEEP_YELLOW
                  : filter === '유통기한 지남'
                  ? RED
                  : BLUE
                : LIGHT_GRAY
            }
          />
        )}
      </View>
      <Text style={tw`text-xs ${color}`}>{filter}</Text>
      {filter !== '카테고리별' && (
        <Text style={tw`text-xs ${color}`}>{`${length}`}</Text>
      )}
      {filter === '카테고리별' && (
        <Icon
          name='chevron-down'
          type='Ionicons'
          size={13}
          color={byCategoryActive ? BLUE : GRAY}
        />
      )}
    </TouchableOpacity>
  );
}
