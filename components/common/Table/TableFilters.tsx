import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_YELLOW, LIGHT_GRAY } from '../../../constant/colors';
import { AllFilter } from '../../../hooks/useTableItemFilter';
import { Food } from '../../../constant/foods';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  allFilters: AllFilter[];
  currentFilter: AllFilter;
  changeFilter: (filter: any) => void;
  getTableList?: (filter: any) => Food[];
}

export default function TableFilters({
  allFilters,
  currentFilter,
  changeFilter,
  getTableList,
}: Props) {
  const activeBoxStyle = (filter: AllFilter) => {
    return filter === currentFilter
      ? 'bg-indigo-500 border-amber-200'
      : 'border-slate-400 bg-white';
  };

  const activeTextColor = (filter: AllFilter) => {
    return filter === currentFilter ? 'text-white' : 'text-slate-500';
  };

  return (
    <View
      style={tw`border-b-2 border-slate-300 flex-row flex-wrap -mx-2 p-2 gap-1`}
    >
      {allFilters.map((filter) => (
        <TouchableOpacity
          onPress={() => changeFilter(filter)}
          key={filter}
          style={tw`flex-row items-center gap-0.5 border py-1 px-2.5 rounded-full 
          ${activeBoxStyle(filter)}`}
        >
          {filter !== '전체' && (
            <Icon
              type='MaterialCommunityIcons'
              name='filter'
              size={16}
              color={filter === currentFilter ? DEEP_YELLOW : LIGHT_GRAY}
            />
          )}
          <Text style={tw`${activeTextColor(filter)}`} fontSize={12}>
            {filter} {getTableList && getTableList(filter).length}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
