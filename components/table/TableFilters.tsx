import { useRoute } from '@react-navigation/native';
import { BLUE, GRAY } from '../../constant/colors';
import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { Filter, FilterObj } from '../../util';
import { Category, foodCategories } from '../../constant/foodCategories';
import { useHandleFilter } from '../../hooks';
import { PlatformIOS } from '../../constant/statusBarHeight';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  filterList: FilterObj[];
  foodList: Food[];
  getTableList: (filter: Filter, list: Food[]) => Food[];
  setCheckedList?: (foods: Food[]) => void;
  setCategory?: (category: Category) => void;
}

export default function TableFilters({
  filterList,
  getTableList,
  foodList,
  setCheckedList,
  setCategory,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();
  const routeFavoriteFoods = route.name === 'FavoriteFoods';

  const scrollViewRef = useRef<ScrollView | null>(null);

  const {
    currentFilter,
    changeFilterState,
    findCategoryFilter, //
    filterState,
    scrollToFilter,
  } = useHandleFilter(scrollViewRef);

  const activeCategory = foodCategories?.find(({ category }) =>
    foodList.map((item) => item.category).includes(category)
  )?.category as Filter;

  const getLength = (filter: Filter) => getTableList(filter, foodList).length;

  const categoryFilter =
    getLength(filterState) || getLength('전체') === 0
      ? filterState
      : activeCategory;

  const onFilterPress = (filter: Filter, index: number) => {
    changeFilterState(filter);

    if (setCheckedList) setCheckedList([]);
    return scrollToFilter(index);
  };

  const onCategoryFilterPress = (filter: Filter) => {
    onFilterPress(filter, filterList.length);
    setCategory(filter as Category);
    return setModalVisible((prev) => !prev);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={tw`h-12 pt-0.5`}
        contentContainerStyle={tw`gap-1 items-start pr-2`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterList.map(({ filter, icon }, index) => (
          <FilterTag
            key={filter}
            filterObj={{ filter, icon }}
            active={filter === currentFilter}
            length={getLength(filter) || 0}
            onFilterPress={() => onFilterPress(filter, index)}
          />
        ))}

        {routeFavoriteFoods && (
          <FilterTag
            filterObj={{ filter: categoryFilter }}
            active={!!findCategoryFilter(currentFilter)}
            length={getLength(filterState) || getLength(activeCategory)}
            onFilterPress={() => onCategoryFilterPress(categoryFilter)}
          >
            <Icon
              name='chevron-down'
              type='Feather'
              size={14}
              color={!!findCategoryFilter(currentFilter) ? BLUE : GRAY}
            />
          </FilterTag>
        )}
      </ScrollView>

      {routeFavoriteFoods && (
        <Modal
          title='카테고리별 필터링'
          closeModal={() => setModalVisible(false)}
          isVisible={modalVisible}
        >
          <View
            style={tw`p-4 flex-row flex-wrap gap-1 bg-stone-100 ${
              PlatformIOS ? 'pb-12' : 'pb-6'
            }`}
          >
            {foodCategories.map(({ category, icon }) => (
              <FilterTag
                key={category}
                foodIcon
                filterObj={{ filter: category, icon }}
                active={category === currentFilter}
                onFilterPress={() => onCategoryFilterPress(category)}
                length={getLength(category)}
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
