import { Text, TouchableOpacity } from './native-component';
import { Filter, getTagColor } from '../../util';
import { useHandleFilter } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { Category } from '../../constant/foodCategories';
import { View } from 'react-native';
import { BLUE, GRAY } from '../../constant/colors';

import CategoryIcon from './CategoryIcon';
import IconChevronDown from '../svg/arrow/IconChevronDown';
import tw from 'twrnc';

interface Props {
  filter: Filter;
  index?: number;
  onFilterPress: (filter: Filter, index?: number) => void;
  getLengthByFilterTag: (filter: Filter) => number;
  foodIcon?: boolean;
}

export default function FilterTag({
  filter,
  index,
  onFilterPress,
  getLengthByFilterTag,
  foodIcon,
}: Props) {
  const { currentFilter, isCategoryFilter } = useHandleFilter();

  const byCategory = filter === '카테고리별';

  const active = byCategory ? !!isCategoryFilter : filter === currentFilter;

  const length = byCategory
    ? getLengthByFilterTag(isCategoryFilter)
    : getLengthByFilterTag(filter);

  const onPress = () => onFilterPress(filter, index);

  const byCategoryFilter = isCategoryFilter
    ? `: ${isCategoryFilter} ${length}개`
    : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `${getTagColor(currentFilter, active, 'bg')} 
        min-w-14 flex-row items-center justify-between border py-2 px-3.5 gap-1.5 rounded-full`,
        shadowStyle(3)
      )}
    >
      {foodIcon && (
        <CategoryIcon
          category={filter as Category}
          size={16}
          inActive={!active && length === 0}
        />
      )}

      <Text
        fontSize={15}
        style={tw`${getTagColor(currentFilter, active, 'text')}`}
      >
        {filter}
        {byCategory ? byCategoryFilter : ` ${length}개`}
      </Text>

      {byCategory && (
        <View style={tw`-mx-1`}>
          <IconChevronDown size={14} color={byCategoryFilter ? BLUE : GRAY} />
        </View>
      )}
    </TouchableOpacity>
  );
}
