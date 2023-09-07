import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foods';
import { Filter, FilterObj } from '../../util';
import { useDispatch, useSelector } from '../../redux/hook';
import { changeFilter } from '../../redux/slice/filterSlice';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import tw from 'twrnc';

interface Props {
  filterList: FilterObj[];
  categoryFilters?: FilterObj[];
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
  const { currentFilter } = useSelector((state) => state.currentFilter);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onFilterPress = (filter: Filter) => {
    dispatch(changeFilter(filter));
    if (setCheckedList) return setCheckedList([]);
  };

  const isCatgegoryFilter = categoryFilters?.find(
    ({ filter }) => filter === currentFilter
  );

  return (
    <View>
      <ScrollView
        style={tw`h-12`}
        contentContainerStyle={tw`gap-1 items-start`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterList.map(({ filter, icon }) => (
          <FilterTag
            key={filter}
            onFilterPress={() => onFilterPress(filter)}
            filterObj={{ filter, icon }}
            length={getTableList(filter, foodList).length || 0}
          />
        ))}

        {categoryFilters && (
          <FilterTag
            onFilterPress={() => {
              if (!isCatgegoryFilter) {
                onFilterPress('신선식품류');
              }
              setModalVisible(true);
            }}
            filterObj={{ filter: '카테고리별', icon: 'filter' }}
            byCategoryActive={!!isCatgegoryFilter}
          />
        )}
      </ScrollView>

      {modalVisible && categoryFilters && (
        <Modal
          title='카테고리별로 보기'
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          hasBackdrop
        >
          <View style={tw`p-4 pb-10 flex-row flex-wrap gap-2`}>
            {categoryFilters.map((filterObj) => (
              <FilterTag
                key={filterObj.filter}
                onFilterPress={() => onFilterPress(filterObj.filter)}
                filterObj={filterObj}
                length={getTableList(filterObj.filter, foodList).length || 0}
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
