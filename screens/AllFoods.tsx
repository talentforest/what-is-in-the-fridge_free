import { SafeBottomAreaView } from '../components/common/native-component';
import { entireFilterObj, expiredFilters, sortByOldDate } from '../util';
import {
  useHandleTableFooterBtns,
  useGetFoodList,
  useHandleFilter,
} from '../hooks';
import { useEffect } from 'react';
import { useDispatch } from '../redux/hook';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import { Pressable } from 'react-native';

import Container from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TableFilters from '../components/table/TableFilters';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';
import AlertModal from '../screen-component/modal/AlertModal';
import tw from 'twrnc';

export default function AllFoods() {
  const { currentFilter, initializeFilter } = useHandleFilter();

  const { getFilteredFoodList, allFoods } = useGetFoodList();

  const {
    onDeleteBtnPress,
    onAddShoppingListBtnPress, //
  } = useHandleTableFooterBtns();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckedList([]));
    initializeFilter();
    return () => {
      dispatch(setCheckedList([]));
    };
  }, []);

  const foodList = sortByOldDate(getFilteredFoodList(currentFilter, allFoods));

  const uncheckAllItems = () => dispatch(setCheckedList([]));

  return (
    <SafeBottomAreaView>
      <Pressable style={tw`flex-1`} onPress={uncheckAllItems}>
        <Container>
          {allFoods.length ? (
            <TableFilters
              filterTagList={[entireFilterObj, ...expiredFilters]}
              foodList={allFoods}
            />
          ) : (
            <></>
          )}

          <TableBody title='전체 식료품' foodList={foodList} />

          <AlertModal />
        </Container>

        <TableFooterContainer color='yellow'>
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
      </Pressable>
    </SafeBottomAreaView>
  );
}
