import { SafeBottomAreaView } from '../components/common/native-component';
import {
  expiredSoonFilter,
  entireFilterObj,
  expiredFilter,
  sortByOldDate,
} from '../util';
import {
  useHandleTableFooterBtns,
  useGetFoodList,
  useHandleFilter,
  useNotification,
} from '../hooks';
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

export default function AllFoods() {
  const { currentFilter, initializeFilter } = useHandleFilter();

  const { getFilteredFoodList, allFoods } = useGetFoodList();

  const { onDeleteBtnPress } = useHandleTableFooterBtns();

  useNotification();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckedList([]));
    initializeFilter();
    return () => {
      dispatch(setCheckedList([]));
    };
  }, []);

  const foodList = sortByOldDate(getFilteredFoodList(currentFilter, allFoods));

  return (
    <SafeBottomAreaView>
      <Container>
        {allFoods.length ? (
          <TableFilters
            filterTagList={[entireFilterObj, expiredFilter, expiredSoonFilter]}
            foodList={allFoods}
          />
        ) : (
          <></>
        )}
        <TableBody title='전체 식료품' foodList={foodList} />
      </Container>

      <TableFooterContainer color='yellow'>
        <TableSelectedHandleBox foodList={foodList}>
          <SquareIconBtn
            btnName='삭제'
            onPress={onDeleteBtnPress}
            icon='trash-can-outline'
          />
        </TableSelectedHandleBox>
      </TableFooterContainer>

      <AlertModal />
    </SafeBottomAreaView>
  );
}
