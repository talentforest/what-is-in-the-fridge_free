import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foods';
import { Filter, FilterObj } from '../../util';

import FilterTag from '../common/FilterTag';
import Modal from '../modal/Modal';
import tw from 'twrnc';

interface Props {
  filterList: FilterObj[];
  categoryFilters?: FilterObj[];
  currentFilter: Filter;
  changeFilter: (filter: any) => void;
  getTableList: (filter: Filter, list: Food[]) => Food[];
  list: Food[];
  setCheckedList?: (foods: Food[]) => void;
}

export default function TableFilters({
  currentFilter,
  filterList,
  categoryFilters,
  changeFilter,
  getTableList,
  list,
  setCheckedList,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const onFilterPress = (filter: Filter) => {
    changeFilter(filter);
    if (setCheckedList) return setCheckedList([]);
  };

  return (
    <View style={tw`-mx-4 -mt-4`}>
      <ScrollView
        style={tw`border-slate-900 px-4 h-12`}
        contentContainerStyle={tw`gap-1 pr-10 items-center`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filterList.map(({ filter, icon }) => (
          <FilterTag
            key={filter}
            onFilterPress={() => onFilterPress(filter)}
            filterObj={{ filter, icon }}
            currentFilter={currentFilter}
            length={getTableList(filter, list).length || 0}
          />
        ))}

        {categoryFilters && (
          <FilterTag
            onFilterPress={() => {
              onFilterPress('신선식품류');
              setModalVisible(true);
            }}
            filterObj={{ filter: '카테고리별', icon: 'filter' }}
            currentFilter={currentFilter}
            byCategoryActive={
              !!categoryFilters.find(({ filter }) => filter === currentFilter)
            }
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
                length={getTableList(filterObj.filter, list).length || 0}
                currentFilter={currentFilter}
              />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
}
