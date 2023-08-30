import { SafeBottomAreaView, Text } from '../components/native-component';
import { useDispatch } from '../redux/hook';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { Food } from '../constant/foods';
import { entireFilterObj, expiredFilters, spaceFilters } from '../util';

import useHandleCheckList from '../hooks/useHandleCheckList';
import useTableItemFilter from '../hooks/useTableItemFilter';
import useHandleTableItem from '../hooks/useHandleTableItem';
import useExpiredFoods from '../hooks/useExpiredFoods';

import Container from '../components/common/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import TableFilters from '../components/common/table/TableFilters';
import tw from 'twrnc';

export default function ExpiredFoods() {
  const { allExpiredFoods } = useExpiredFoods();

  const dispatch = useDispatch();

  const {
    currentFilter,
    changeFilter,
    getExpiredTableList, //
  } = useTableItemFilter();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress,
    isCheckedItem,
    checkedFoodNameList,
  } = useHandleCheckList();

  const deleteAlertGuide = {
    title: '유통기한 주의 식료품 제거',
    desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 냉장고에서 제거하시겠습니까?`,
    defaultBtnText: '제거',
    onPress: (filteredArr: Food[]) => dispatch(setAllFoods(filteredArr)),
  };

  const { onDeletePress } = useHandleTableItem({
    deleteAlertGuide,
    checkedList,
    setCheckedList,
  });

  const expiredTableList = getExpiredTableList(currentFilter);

  return (
    <SafeBottomAreaView>
      <Container>
        {/* 필터 */}
        <TableFilters
          filterList={[entireFilterObj, ...spaceFilters, ...expiredFilters]}
          currentFilter={currentFilter}
          changeFilter={changeFilter}
          getTableList={getExpiredTableList}
          setCheckedList={setCheckedList}
        />

        {/* 전체 표 */}
        <TableContainer color='amber'>
          <TableHeader
            title={`유통기한 주의 식료품`}
            entireChecked={
              checkedList.length === expiredTableList.length &&
              !!checkedList.length
            }
            onEntirePress={() => onEntireBoxPress(expiredTableList)}
            color='amber'
          >
            <Text style={tw`text-slate-500 text-sm`}>유통기한순</Text>
          </TableHeader>

          {/* 식료품 리스트 */}
          <TableBody
            list={expiredTableList}
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
            color='amber'
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkedList}
            onDeletePress={() => onDeletePress(allExpiredFoods)}
            buttons={['delete']}
            color='amber'
          />
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
