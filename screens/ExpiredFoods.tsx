import { SafeBottomAreaView } from '../components/common/native-component';
import { entireFilterObj, expiredFilters, spaceFilters } from '../util';
import {
  useHandleCheckList,
  useHandleTableItem,
  useGetFoodList,
  useSetAnimationState,
  useHandleFilter,
} from '../hooks/';
import { useEffect } from 'react';

import Container from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TableFilters from '../components/table/TableFilters';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';

export default function ExpiredFoods() {
  const { currentFilter, initializeFilter } = useHandleFilter();

  const { getFilteredFoodList, allExpiredFoods } = useGetFoodList();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress, //
  } = useHandleCheckList();

  const { onDeleteExpiredFoodPress, onAddShoppingListBtnPress } =
    useHandleTableItem({
      checkedList,
      setCheckedList,
    });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  useEffect(() => {
    setCheckedList([]);
    initializeFilter();
  }, []);

  const filteredList = getFilteredFoodList(currentFilter, allExpiredFoods());
  const allChecked = checkedList.length === filteredList.length;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableFilters
          filterList={[entireFilterObj, ...expiredFilters, ...spaceFilters]}
          getTableList={getFilteredFoodList}
          setCheckedList={setCheckedList}
          foodList={allExpiredFoods()}
        />

        <TableBody
          title='소비기한 주의 식료품'
          filteredList={filteredList}
          onCheckBoxPress={onCheckBoxPress}
          checkedList={checkedList}
          animationState={animationState}
          afterAnimation={() =>
            afterAnimation(onDeleteExpiredFoodPress, allExpiredFoods())
          }
        />

        <TableFooterContainer>
          <TableSelectedHandleBox
            list={checkedList}
            entireChecked={allChecked && !!checkedList.length}
            onEntirePress={() => onEntireBoxPress(filteredList)}
          >
            <SquareIconBtn
              icon='basket-plus'
              disabled={checkedList.length === 0}
              onPress={onAddShoppingListBtnPress}
            />
            <SquareIconBtn
              onPress={() =>
                onDeleteExpiredFoodPress(setAnimationState, animationState)
              }
              icon='trash-can'
              disabled={checkedList.length === 0}
            />
          </TableSelectedHandleBox>
        </TableFooterContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
