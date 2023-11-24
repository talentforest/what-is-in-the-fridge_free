import { SafeBottomAreaView } from '../components/common/native-component';
import { entireFilterObj, expiredFilters, spaceFilters } from '../util';
import {
  useHandleTableFooterBtns,
  useGetFoodList,
  useHandleFilter,
} from '../hooks/';
import { useEffect } from 'react';
import { useDispatch } from '../redux/hook';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';

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
    onDeleteBtnPress,
    onAddShoppingListBtnPress, //
  } = useHandleTableFooterBtns();

  const dispatch = useDispatch();

  useEffect(() => {
    initializeFilter();
    return () => {
      dispatch(setCheckedList([]));
    };
  }, []);

  const foodList = getFilteredFoodList(currentFilter, expiredFoods);

  return (
    <SafeBottomAreaView>
      <Container>
        <TableFilters
          filterTagList={[entireFilterObj, ...expiredFilters, ...spaceFilters]}
          foodList={expiredFoods}
        />

        <TableBody title='소비기한 주의 식료품' foodList={foodList} />

        <TableFooterContainer>
          <TableSelectedHandleBox foodList={foodList}>
            <SquareIconBtn
              btnName='장보기 추가'
              icon='basket-plus-outline'
              onPress={onAddShoppingListBtnPress}
            />
            <SquareIconBtn
              btnName='삭제'
              onPress={onDeleteBtnPress}
              icon='trash-can-outline'
            />
          </TableSelectedHandleBox>
        </TableFooterContainer>

        <AlertModal />
      </Container>
    </SafeBottomAreaView>
  );
}
