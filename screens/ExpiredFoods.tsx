import { SafeBottomAreaView } from '../components/common/native-component';
import { entireFilterObj, expiredFilters, spaceFilters } from '../util';
import {
  useHandleCheckList,
  useHandleTableItem,
  useGetFoodList,
  useSetAnimationState,
} from '../hooks/';
import { useDispatch, useSelector } from '../redux/hook';
import { useEffect } from 'react';
import { changeFilter } from '../redux/slice/filterSlice';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TableFilters from '../components/table/TableFilters';
import SquareBtn from '../components/buttons/SquareBtn';

export default function ExpiredFoods() {
  const { currentFilter } = useSelector((state) => state.currentFilter);

  const { getFilteredFoodList, allExpiredFoods } = useGetFoodList();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress, //
  } = useHandleCheckList();

  const { onDeletePress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  const filteredList = getFilteredFoodList(currentFilter, allExpiredFoods);

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentFilter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  }, []);

  return (
    <SafeBottomAreaView>
      <Container>
        {/* 전체 표 */}
        <TableContainer>
          {/* 필터 */}
          <TableFilters
            filterList={[entireFilterObj, ...expiredFilters, ...spaceFilters]}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={allExpiredFoods}
          />
          <TableHeader title='식료품 목록' columnTitle='오래된순' />
          {/* 식료품 리스트 */}
          <TableBody
            title='유통기한 주의 식료품'
            list={filteredList}
            onCheckBoxPress={onCheckBoxPress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={() =>
              afterAnimation(onDeletePress, allExpiredFoods)
            }
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkedList}
            entireChecked={
              checkedList.length === filteredList.length && !!checkedList.length
            }
            onEntirePress={() => onEntireBoxPress(filteredList)}
          >
            <SquareBtn
              name='냉장고에서 삭제'
              onPress={() =>
                onDeletePress(
                  allExpiredFoods,
                  setAnimationState,
                  animationState
                )
              }
              icon='trash-can'
              disabled={checkedList.length === 0}
            />
          </TableFooter>
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
