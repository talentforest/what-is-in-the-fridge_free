import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Food, PantryFood } from '../../constant/foodInfo';
import { Filter, FilterObj } from '../../util';
import { BLUE, DEEP_YELLOW, RED } from '../../constant/colors';
import { FoodCategory } from '../../constant/foodCategories';
import { useHandleFilter } from '../../hooks';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import tw from 'twrnc';

interface Props {
  filterList: FilterObj[];
  categoryFilters?: FoodCategory[];
  foodList: (Food | PantryFood)[];
  getTableList: (
    filter: Filter,
    list: (Food | PantryFood)[]
  ) => (Food | PantryFood)[];
  setCheckedList?: (foods: (Food | PantryFood)[]) => void;
}

export default function TableFilters({
  filterList,
  categoryFilters,
  getTableList,
  foodList,
  setCheckedList,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const { currentFilter, onFilterPress, isCategoryFilter } = useHandleFilter();

  return (
    <View>
      <ScrollView
        style={tw`h-12 -mt-2 pt-1 px-0.5`}
        contentContainerStyle={tw`gap-1 items-start pr-2`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterList.map(({ filter, icon }) => (
          <FilterTag
            key={filter}
            filterObj={{ filter, icon }}
            iconColor={
              filter === '유통기한 3일 이내'
                ? DEEP_YELLOW
                : filter === '유통기한 만료'
                ? RED
                : BLUE
            }
            active={filter === currentFilter}
            onFilterPress={() => onFilterPress(filter, setCheckedList)}
            length={getTableList(filter, foodList).length || 0}
          />
        ))}

        {categoryFilters && (
          <FilterTag
            filterObj={{ filter: '카테고리', icon: 'filter' }}
            iconColor={BLUE}
            active={!!isCategoryFilter}
            onFilterPress={() => {
              if (!isCategoryFilter) {
                onFilterPress('신선식품류', setCheckedList);
              }
              setModalVisible(true);
            }}
            length={getTableList(currentFilter, foodList).length || 0}
          />
        )}
      </ScrollView>

      {modalVisible && categoryFilters && (
        <Modal
          title='카테고리별 필터링'
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          hasBackdrop
        >
          <View style={tw`p-4 pb-2 flex-row flex-wrap gap-1`}>
            {categoryFilters.map(({ category, color, icon }) => (
              <FilterTag
                key={category}
                filterObj={{ filter: category, icon }}
                iconColor={color}
                active={category === currentFilter}
                onFilterPress={() => onFilterPress(category)}
                length={getTableList(category, foodList).length || 0}
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
