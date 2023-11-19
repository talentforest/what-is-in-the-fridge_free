import { SafeBottomAreaView } from '../components/common/native-component';
import { entireFilterObj, expiredFilters, spaceFilters } from '../util';
import {
  useHandleCheckList,
  useHandleTableItem,
  useGetFoodList,
  useSetAnimationState,
  useHandleFilter,
} from '../hooks/';
import { useCallback, useEffect } from 'react';

import Container from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TableFilters from '../components/table/TableFilters';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';
import AlertModal from '../screen-component/modal/AlertModal';

export default function ExpiredFoods() {
  const { currentFilter, initializeFilter } = useHandleFilter();

  const { getFilteredFoodList, expiredFoods } = useGetFoodList();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress, //
  } = useHandleCheckList();

  const {
    onDeleteExpiredFoodPress,
    onAddShoppingListBtnPress,
    onConfirmPress,
  } = useHandleTableItem({ checkedList, setCheckedList });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  useEffect(() => {
    setCheckedList([]);
    initializeFilter();
  }, []);

  const foodList = useCallback(() => {
    return getFilteredFoodList(currentFilter, expiredFoods);
  }, [currentFilter, expiredFoods]);

  const afterAnimationWork = () => {
    afterAnimation(onDeleteExpiredFoodPress, expiredFoods);
  };

  return (
    <SafeBottomAreaView>
      <Container>
        <TableFilters
          filterTagList={[entireFilterObj, ...expiredFilters, ...spaceFilters]}
          foodList={expiredFoods}
          setCheckedList={setCheckedList}
        />

        <TableBody
          title='소비기한 주의 식료품'
          foodList={foodList}
          onCheckBoxPress={onCheckBoxPress}
          checkedList={checkedList}
          animationState={animationState}
          afterAnimation={afterAnimationWork}
        />

        <TableFooterContainer active={!!checkedList.length}>
          <TableSelectedHandleBox
            checkedList={checkedList}
            foodList={foodList}
            onEntirePress={onEntireBoxPress}
          >
            <SquareIconBtn
              btnName='장보기 추가'
              icon='basket-plus-outline'
              disabled={checkedList.length === 0}
              onPress={onAddShoppingListBtnPress}
            />
            <SquareIconBtn
              btnName='삭제'
              onPress={() => onDeleteExpiredFoodPress(animationState)}
              icon='trash-can-outline'
              disabled={checkedList.length === 0}
            />
          </TableSelectedHandleBox>
        </TableFooterContainer>

        <AlertModal onPress={() => onConfirmPress(setAnimationState)} />
      </Container>
    </SafeBottomAreaView>
  );
}
