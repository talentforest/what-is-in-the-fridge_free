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

  return (
    <TouchableOpacity
      onPress={() => onFilterPress(filter)}
      style={tw.style(
        `${getTagColor(currentFilter, active, 'bg', length)} 
        min-w-17 flex-row items-center justify-between border py-1.5 px-3.5 gap-1.5 rounded-full`,
        shadowStyle(3)
      )}
      disabled={length === 0}
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
        {filter}
      </Text>
      <Text
        fontSize={16}
        style={tw`${getTagColor(currentFilter, active, 'text', length)}`}
      >
        {length}개
      </Text>

      {children}
    </TouchableOpacity>
  );
}
