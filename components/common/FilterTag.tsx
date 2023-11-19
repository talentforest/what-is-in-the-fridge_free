import { Text, TouchableOpacity } from './native-component';
import { Filter, FilterObj, getTagColor } from '../../util';
import { useHandleFilter } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { Category } from '../../constant/foodCategories';
import { ReactNode } from 'react';

import CategoryIcon from './CategoryIcon';
import tw from 'twrnc';

interface Props {
  onFilterPress: (filter: Filter) => void;
  filter: Filter;
  getLengthByFilterTag: (filter: Filter) => number;
  foodIcon?: boolean;
  children?: ReactNode;
}

export default function FilterTag({
  onFilterPress,
  filter,
  foodIcon,
  children,
  getLengthByFilterTag,
}: Props) {
  const { currentFilter } = useHandleFilter();

  const active = filter === currentFilter;

  const length = getLengthByFilterTag(filter);

  const onPress = () => onFilterPress(filter);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={length === 0}
      style={tw.style(
        `${getTagColor(currentFilter, active, 'bg', length)} 
        min-w-14 flex-row items-center justify-between border py-1.5 px-3.5 gap-1.5 rounded-full`,
        shadowStyle(3)
      )}
    >
      {foodIcon && (
        <CategoryIcon
          category={filter as Category}
          size={16}
          inActive={length === 0}
        />
      )}

      <Text
        fontSize={16}
        style={tw`${getTagColor(currentFilter, active, 'text', length)}`}
      >
        {filter} {length}개
      </Text>

      {children}
    </TouchableOpacity>
  );
}
