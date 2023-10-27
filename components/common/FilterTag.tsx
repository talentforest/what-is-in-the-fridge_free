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
        h-9 min-w-20 flex-row items-center border px-3 py-1 gap-1.5 rounded-full`,
        shadowStyle(3)
      )}
      disabled={length === 0}
    >
      {foodIcon && (
        <CategoryIcon
          category={filter as Category}
          size={16}
          inactive={length === 0}
        />
      )}
      <Text
        style={tw`text-sm ${getTagColor(
          currentFilter,
          active,
          'text',
          length
        )}`}
      >
        {filter}
      </Text>
      <Text
        style={tw`text-sm ${getTagColor(
          currentFilter,
          active,
          'text',
          length
        )}`}
      >
        {`${length}`}개
      </Text>

      {/* chevron-down icon */}
      {children}
    </TouchableOpacity>
  );
}
