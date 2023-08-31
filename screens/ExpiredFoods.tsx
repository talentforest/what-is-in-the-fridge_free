import {
  SafeBottomAreaView,
  Text,
} from '../components/common/native-component';
import { useState } from 'react';
import { Filter, entireFilterObj, expiredFilters, spaceFilters } from '../util';
import {
  useHandleCheckList,
  useHandleTableItem,
  useGetFoodList,
} from '../hooks/';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TableFilters from '../components/table/TableFilters';
import tw from 'twrnc';

export default function ExpiredFoods() {
  const [currentFilter, setCurrentFilter] = useState<Filter>('전체');

  const { getFilteredFoodList, allExpiredFoodList } = useGetFoodList();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress,
    isCheckedItem,
  } = useHandleCheckList();

  const { onDeletePress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  const filteredList = getFilteredFoodList(currentFilter, allExpiredFoodList);

  const changeFilter = (currentFilter: Filter) => {
    setCurrentFilter(currentFilter);
  };

  return (
    <SafeBottomAreaView>
      <Container>
        {/* 필터 */}
        <TableFilters
          filterList={[entireFilterObj, ...spaceFilters, ...expiredFilters]}
          currentFilter={currentFilter}
          changeFilter={changeFilter}
          getTableList={getFilteredFoodList}
          setCheckedList={setCheckedList}
          list={allExpiredFoodList}
        />

        {/* 전체 표 */}
        <TableContainer color='amber'>
          <TableHeader
            title={`유통기한 주의 식료품`}
            entireChecked={
              checkedList.length === filteredList.length && !!checkedList.length
            }
            onEntirePress={() => onEntireBoxPress(filteredList)}
            color='amber'
          >
            <Text style={tw`text-slate-500 text-sm`}>유통기한순</Text>
          </TableHeader>

          {/* 식료품 리스트 */}
          <TableBody
            title='유통기한 주의 식료품'
            list={filteredList}
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
            color='amber'
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkedList}
            onDeletePress={() => onDeletePress(allExpiredFoodList)}
            buttons={['delete']}
            color='amber'
          />
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
