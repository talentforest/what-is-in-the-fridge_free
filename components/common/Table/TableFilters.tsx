import { ScrollView, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { BLUE, DEEP_YELLOW, LIGHT_GRAY, RED } from '../../../constant/colors';
import { Food } from '../../../constant/foods';
import { Filter, FilterObj } from '../../../util';

import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  filterList: FilterObj[];
  currentFilter: Filter;
  changeFilter: (filter: any) => void;
  getTableList?: (filter: Filter, list?: Food[]) => Food[];
  list?: Food[];
  setCheckedList?: (foods: Food[]) => void;
}

export const INACTIVE_COLOR = 'bg-white border-slate-600 text-slate-600';
export const DEFAULT_COLOR = 'bg-blue-100 border-blue-600 text-blue-600';
export const EXPIRED_COLOR = 'bg-red-50 border-red-400 text-red-600';
export const LEFT_3_DAYS_COLOR = 'bg-amber-50 border-amber-400 text-amber-600';

export default function TableFilters({
  filterList,
  currentFilter,
  changeFilter,
  getTableList,
  list,
  setCheckedList,
}: Props) {
  const ACTIVE_COLOR =
    currentFilter === '유통기한 3일 이내'
      ? LEFT_3_DAYS_COLOR
      : currentFilter === '유통기한 지남'
      ? EXPIRED_COLOR
      : DEFAULT_COLOR;

  const onFilterPress = (filter: Filter) => {
    changeFilter(filter);
    if (setCheckedList) return setCheckedList([]);
  };

  const getColor = (filter: Filter) => {
    return filter === currentFilter ? ACTIVE_COLOR : INACTIVE_COLOR;
  };

  return (
    <View style={tw`-mx-4 -mt-4`}>
      <ScrollView
        style={tw`border-slate-900 px-4 h-12`}
        contentContainerStyle={tw`gap-1 pr-10 items-center`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterList.map(({ filter, icon }) => (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterPress(filter)}
            style={tw`flex-row items-center border px-2.5 py-1 gap-1 rounded-full 
            ${getColor(filter)}`}
          >
            {filter !== '전체' && (
              <View style={tw`-mx-0.5`}>
                <Icon
                  type='MaterialCommunityIcons'
                  name={icon}
                  size={13}
                  color={
                    filter === currentFilter
                      ? filter === '유통기한 3일 이내'
                        ? DEEP_YELLOW
                        : filter === '유통기한 지남'
                        ? RED
                        : BLUE
                      : LIGHT_GRAY
                  }
                />
              </View>
            )}
            <Text style={tw`text-xs ${getColor(filter)}`}>{filter}</Text>
            <Text style={tw`text-xs ${getColor(filter)}`}>
              {getTableList && getTableList(filter, list).length}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
