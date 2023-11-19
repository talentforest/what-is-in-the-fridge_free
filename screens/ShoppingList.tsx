import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { FlatList } from 'react-native';
import {
  useFindFood,
  useHandleCheckList,
  useHandleTableItem,
  useSetAnimationState,
  useSubmitFoodsFromInput,
} from '../hooks';
import { MAX_NUM_ADD_AT_ONCE, alertPhrase } from '../constant/alertPhrase';
import { closeKeyboard, scrollToIndex } from '../util';
import { MAX_LIMIT, initialFridgeFood } from '../constant/foodInfo';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';
import { setFormFood } from '../redux/slice/formFoodSlice';

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

  const [modalVisible, setModalVisible] = useState(false);
  const [addAtOnceModal, setAddAtOnceModal] = useState(false);

  const flatListRef = useRef<FlatList | null>(null);

  const { findFood, allFoods } = useFindFood();

  const dispatch = useDispatch();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress, //
  } = useHandleCheckList();

  const {
    onDeleteFoodPress,
    onAddToFridgePress,
    onConfirmPress, //
  } = useHandleTableItem({ checkedList, setCheckedList, setModalVisible });

  const {
    animationState,
    setAnimationState,
    afterAnimation, //
  } = useSetAnimationState();

  const {
    inputValue,
    setInputValue,
    onSubmitShoppingListItem, //
  } = useSubmitFoodsFromInput();

  const onSubmitEditing = () => {
    if (inputValue === '') return closeKeyboard();
    onSubmitShoppingListItem(inputValue, setAnimationState);
    setInputValue('');
    scrollToIndex(flatListRef, shoppingList.length - 1);
  };

  const onAddAtOnceBtnPress = () => {
    const limitReached = MAX_LIMIT === allFoods.length;
    if (allFoods.length + checkedList.length > MAX_LIMIT) {
      const {
        excessTotal: { title },
      } = alertPhrase;
      dispatch(toggleAlertModal(true));
      dispatch(
        setAlertInfo({
          title,
          msg: `식료품 저장 최대 한도인 ${MAX_LIMIT}개를 초과하게 됩니다. ${
            limitReached
              ? ''
              : `${
                  MAX_LIMIT - allFoods.length
                }개의 식료품을 더 추가하실 수 있습니다.`
          } `,
          btns: ['확인'],
        })
      );
      return;
    }

    const hasCheckListFood = checkedList.some((food) => findFood(food.name));
    if (hasCheckListFood) {
      const {
        alreadyExist: { title, msg },
      } = alertPhrase;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }

    if (checkedList.length > MAX_NUM_ADD_AT_ONCE) {
      const {
        excessToAddAtOnce: { title, msg },
      } = alertPhrase;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }

    dispatch(setFormFood(initialFridgeFood));
    setAddAtOnceModal(true);
  };

  const onDeleteBtnPress = () => {
    onDeleteFoodPress(animationState, shoppingList);
  };

  const afterAnimationWork = () => {
    afterAnimation(onDeleteFoodPress, shoppingList);
  };

  const foodList = () => shoppingList;

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableBody
            title='장보기 식료품'
            foodList={foodList}
            onCheckBoxPress={onCheckBoxPress}
            addToFridgePress={onAddToFridgePress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={afterAnimationWork}
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox
              checkedList={checkedList}
              foodList={foodList}
              onEntirePress={onEntireBoxPress}
            >
              <SquareIconBtn
                btnName='한번에 추가'
                icon='shape-square-rounded-plus'
                disabled={checkedList.length === 0}
                onPress={onAddAtOnceBtnPress}
              />
              <SquareIconBtn
                btnName='삭제'
                icon='trash-can-outline'
                disabled={checkedList.length === 0}
                onPress={onDeleteBtnPress}
              />
            </TableSelectedHandleBox>

            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              placeholder='식료품 이름을 작성해주세요.'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === ''}
              checkedListLength={checkedList.length}
            />
          </TableFooterContainer>

          <AddShoppingListFoodModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCheckedList={setCheckedList}
          />

          <AddAtOnceModal
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            modalVisible={addAtOnceModal}
            setModalVisible={setAddAtOnceModal}
            onConfirmPress={() => onConfirmPress(setAnimationState)}
          />
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
