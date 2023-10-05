import { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { Filter, FilterObj } from '../../util';
import { BLUE, DEEP_YELLOW, RED } from '../../constant/colors';
import { FoodCategory, foodCategories } from '../../constant/foodCategories';
import { useHandleFilter } from '../../hooks';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import tw from 'twrnc';

interface Props {
  filterList: FilterObj[];
  categoryFilters?: FoodCategory[];
  foodList: Food[];
  getTableList: (filter: Filter, list: Food[]) => Food[];
  setCheckedList?: (foods: Food[]) => void;
}

export default function TableFilters({
  filterList,
  categoryFilters,
  getTableList,
  foodList,
  setCheckedList,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const {
    currentFilter,
    onFilterPress,
    initializeFilter,
    findCategoryFilter, //
  } = useHandleFilter();

  useEffect(() => {
    initializeFilter();
    return () => {
      initializeFilter();
    };
  }, []);

  const firstActiveCategoryFilter = foodCategories?.find(({ category }) =>
    foodList.map((item) => item.category).includes(category)
  )?.category;

  const itemScrollTo = (filter: Filter, index: number) => {
    const offset = index <= 1 ? 0 : filter.length > 6 ? 90 : 180;
    return index === filterList.length - 1
      ? scrollViewRef.current?.scrollToEnd()
      : scrollViewRef.current?.scrollTo({
          x: index * 50 + offset,
          y: 0,
          animated: true,
        });
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
            onFilterPress={() => {
              onFilterPress(filter, setCheckedList);
              itemScrollTo(filter, index);
            }}
            length={getTableList(filter, foodList).length || 0}
          />
        ))}

        {categoryFilters && (
          <FilterTag
            filterObj={{ filter: '카테고리', icon: 'filter' }}
            active={
              !!findCategoryFilter(currentFilter) ||
              currentFilter === '카테고리'
            }
            onFilterPress={() => {
              onFilterPress(
                !!foodList.length
                  ? (firstActiveCategoryFilter as Filter)
                  : '카테고리',
                setCheckedList
              );
              setModalVisible(true);
            }}
            length={getTableList(currentFilter, foodList).length || 0}
          />
        )}
      </ScrollView>

      {modalVisible && categoryFilters && (
        <Modal
          title='카테고리별 필터링'
          closeModal={() => setModalVisible(false)}
          isVisible={modalVisible}
        >
          <View style={tw`p-4 flex-row flex-wrap gap-1 bg-stone-100 pb-6`}>
            {categoryFilters.map(({ category, icon }) => (
              <FilterTag
                key={category}
                categoryFilter
                filterObj={{ filter: category, icon }}
                active={category === currentFilter}
                onFilterPress={() => {
                  onFilterPress(category);
                  setModalVisible(false);
                }}
                length={getTableList(category, foodList).length}
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
