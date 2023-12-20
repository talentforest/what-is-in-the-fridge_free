import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { Filter, FilterObj } from '../../util';
import { useGetFoodList, useHandleFilter } from '../../hooks';
import { Category, foodCategories } from '../../constant/foodCategories';
import { useDispatch, useSelector } from '../../redux/hook';
import { changeCategory } from '../../redux/slice/food/categorySlice';
import { showCategoryFilterModal } from '../../redux/slice/modalVisibleSlice';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import tw from 'twrnc';

interface Props {
  filterTagList: FilterObj[];
  foodList: Food[];
  withCategoryFilterTag?: boolean;
}

export default function TableFilters({
  filterTagList,
  foodList,
  withCategoryFilterTag,
}: Props) {
  const { categoryFilterModalVisible } = useSelector(
    (state) => state.modalVisible
  );

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { categoryFilter, onFilterTagPress } = useHandleFilter(scrollViewRef);

  const { getFilteredFoodList } = useGetFoodList();

  const getLengthByFilterTag = (filter: Filter) => {
    return getFilteredFoodList(filter, foodList).length;
  };

  const dispatch = useDispatch();

  const onCategoryFilterTagPress = (filter: Filter) => {
    onFilterTagPress(filter, 'end');
    dispatch(changeCategory(filter as Category));
    dispatch(showCategoryFilterModal(false));
  };

  const onByCategoryTagPress = () => {
    onFilterTagPress(categoryFilter, 'end');
    dispatch(changeCategory(categoryFilter as Category));
    dispatch(showCategoryFilterModal(true));
  };

  const onFilterPress = (filter: Filter, index: number) => {
    onFilterTagPress(filter, index);
  };

  const closeModal = () => dispatch(showCategoryFilterModal(false));

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={tw`h-11`}
        contentContainerStyle={tw`gap-1 items-start pr-5`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterTagList.map(({ filter }, index) => (
          <FilterTag
            key={filter}
            filter={filter}
            index={index}
            onFilterPress={onFilterPress}
            getLengthByFilterTag={getLengthByFilterTag}
          />
        ))}

        {withCategoryFilterTag && (
          <FilterTag
            filter='카테고리별'
            getLengthByFilterTag={getLengthByFilterTag}
            onFilterPress={onByCategoryTagPress}
          />
        )}
      </ScrollView>

      {withCategoryFilterTag && (
        <Modal
          title='카테고리별 필터링'
          closeModal={closeModal}
          isVisible={categoryFilterModalVisible}
        >
          <View style={tw`flex-row flex-wrap gap-1 pt-2`}>
            {foodCategories.map(({ category }) => (
              <FilterTag
                key={category}
                filter={category}
                getLengthByFilterTag={getLengthByFilterTag}
                onFilterPress={onCategoryFilterTagPress}
                foodIcon
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
