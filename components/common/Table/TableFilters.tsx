import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_YELLOW, LIGHT_GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

export type Filter = '전체' | '냉장고에 있음' | '냉장고에 없음';

interface Props {
  currentFilter: Filter;
  changeFilter: (filter: Filter) => void;
}

export default function TableFilters({ currentFilter, changeFilter }: Props) {
  return (
    <View style={tw`flex-row flex-wrap pt-2 gap-1`}>
      {['전체', '냉장고에 있음', '냉장고에 없음'].map((filter) => (
        <TouchableOpacity
          onPress={() => changeFilter(filter as Filter)}
          key={filter}
          style={tw`flex-row items-center gap-0.5 border py-1 px-2 rounded-full ${
            filter === currentFilter
              ? 'bg-amber-50 border-amber-500'
              : 'border-slate-400 bg-white'
          }`}
        >
          {filter !== '전체' && (
            <Icon
              type='MaterialCommunityIcons'
              name='filter'
              size={16}
              color={filter === currentFilter ? DEEP_YELLOW : LIGHT_GRAY}
            />
          )}
          <Text
            style={tw`${
              filter === currentFilter ? 'text-amber-600' : 'text-slate-500'
            }`}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
