import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { Filter, FilterObj } from '../../util';
import { useGetFoodList, useHandleFilter } from '../../hooks';
import { BLUE, GRAY } from '../../constant/colors';
import { Category, foodCategories } from '../../constant/foodCategories';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import IconChevronDown from '../svg/arrow/IconChevronDown';
import tw from 'twrnc';

interface Props {
  filterTagList: FilterObj[];
  foodList: Food[];
  setCheckedList?: (foods: Food[]) => void;
  setCategory?: (category: Category) => void;
  withFoodCategoryFilterTag?: boolean;
}

export default function TableFilters({
  filterTagList,
  foodList,
  setCheckedList,
  setCategory,
  withFoodCategoryFilterTag,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const {
    currentFilter,
    currFoodCategoryFilter,
    onFilterTagPress, //
  } = useHandleFilter(scrollViewRef);

  const { getFilteredFoodList } = useGetFoodList();

  const getLengthByFilterTag = (filter: Filter) => {
    return getFilteredFoodList(filter, foodList).length;
  };

  const onCategoryFilterTagPress = (filter: Filter) => {
    onFilterTagPress(filter, foodList.length);
    setCategory(filter as Category);
    if (setCheckedList) {
      setCheckedList([]);
    }
    return setModalVisible((prev) => !prev);
  };

  const onFilterPress = (filter: Filter, index: number) => {
    onFilterTagPress(filter, index);
    if (setCheckedList) {
      setCheckedList([]);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={tw`h-11.5 pt-0.5 mb-1`}
        contentContainerStyle={tw`gap-1 items-start pr-2`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterTagList.map(({ filter }, index) => (
          <FilterTag
            key={filter}
            filter={filter}
            onFilterPress={() => onFilterPress(filter, index)}
            getLengthByFilterTag={getLengthByFilterTag}
          />
        ))}

        {withFoodCategoryFilterTag && (
          <FilterTag
            getLengthByFilterTag={getLengthByFilterTag}
            filter={currFoodCategoryFilter}
            onFilterPress={() => {
              onCategoryFilterTagPress(currFoodCategoryFilter);
            }}
          >
            <View style={tw`-mx-1`}>
              <IconChevronDown
                size={14}
                color={currentFilter === currFoodCategoryFilter ? BLUE : GRAY}
              />
            </View>
          </FilterTag>
        )}
      </ScrollView>

      {withFoodCategoryFilterTag && (
        <Modal
          title='카테고리별 필터링'
          closeModal={closeModal}
          isVisible={modalVisible}
        >
          {/* 생각해보니 객체를 Props 로 전달하면 성능상 안좋네... */}
          <View style={tw`flex-row flex-wrap gap-1`}>
            {foodCategories.map(({ category: filter }) => (
              <FilterTag
                key={filter}
                filter={filter}
                getLengthByFilterTag={getLengthByFilterTag}
                onFilterPress={() => {
                  onCategoryFilterTagPress(filter);
                }}
                foodIcon
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
