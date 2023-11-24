import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { FlatList } from 'react-native';
import { closeKeyboard, scrollToIndex } from '../util';
import { useHandleTableFooterBtns, useSubmitFoodsFromInput } from '../hooks';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';

import AddShoppingListFoodModal from '../screen-component/modal/AddShoppingListFoodModal';
import Container from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';
import AddAtOnceModal from '../screen-component/modal/AddAtOnceModal';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { checkedList } = useSelector((state) => state.checkedList);

  const flatListRef = useRef<FlatList | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCheckedList([]));
    };
  }, []);

  const { onDeleteBtnPress, onAddAtOnceBtnPress } = useHandleTableFooterBtns();

  const {
    inputValue,
    setInputValue,
    onSubmitShoppingListItem, //
  } = useSubmitFoodsFromInput();

  const onSubmitEditing = () => {
    if (inputValue === '') return closeKeyboard();
    onSubmitShoppingListItem(inputValue);
    setInputValue('');
    scrollToIndex(flatListRef, shoppingList.length - 1);
  };

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableBody
            title='장보기 식료품'
            foodList={shoppingList}
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox foodList={shoppingList}>
              <SquareIconBtn
                btnName='한번에 추가'
                icon='shape-square-rounded-plus'
                onPress={onAddAtOnceBtnPress}
              />
              <SquareIconBtn
                btnName='삭제'
                icon='trash-can-outline'
                onPress={onDeleteBtnPress}
              />
            </TableSelectedHandleBox>

            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              placeholder='식료품 이름을 작성해주세요.'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === ''}
            />
          </TableFooterContainer>

          <AddShoppingListFoodModal />

          <AddAtOnceModal />
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
