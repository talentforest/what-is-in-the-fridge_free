import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { FlatList, Keyboard } from 'react-native';
import {
  useFindFood,
  useHandleCheckList,
  useHandleTableItem,
  useSetAnimationState,
  useSubmitFoodsFromInput,
} from '../hooks';
import { formFourSteps } from '../constant/formInfo';
import { MAX_NUM_ADD_AT_ONCE, alertPhrase } from '../constant/alertPhrase';
import { selectNone } from '../redux/slice/selectedFoodSlice';
import { scrollToIndex } from '../util';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';

import AddShoppingListFoodModal from '../screen-component/modal/AddShoppingListFoodModal';
import Container from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';
import AddAtOnceModal from '../screen-component/modal/AddAtOnceModal';
import { MAX_LIMIT } from '../constant/foodInfo';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const [modalVisible, setModalVisible] = useState(false);
  const [addAtOnceModal, setAddAtOnceModal] = useState(false);
  const [keyword, setKeyword] = useState('');

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

  const { onSubmitShoppingListItem } = useSubmitFoodsFromInput();

  const onSubmitEditing = () => {
    if (keyword === '') return Keyboard.dismiss();
    onSubmitShoppingListItem(keyword, setAnimationState);
    setKeyword('');
    scrollToIndex(flatListRef, shoppingList.length - 1);
  };

  const onAddAtOnceBtnPress = () => {
    if (allFoods.length + checkedList.length >= MAX_LIMIT) {
      const {
        excessTotal: { title },
      } = alertPhrase;
      dispatch(toggleAlertModal(true));
      dispatch(
        setAlertInfo({
          title,
          msg: `식료품 저장 개수의 최대 한도인 ${MAX_LIMIT}개를 초과하게 됩니다. ${
            MAX_LIMIT === allFoods.length
              ? '더 추가하실 수 없습니다'
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

    dispatch(selectNone());
    setAddAtOnceModal(true);
  };

  const onDeleteBtnPress = () => {
    onDeleteFoodPress(animationState, shoppingList);
  };

  const allChecked = checkedList.length === shoppingList.length;

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableBody
            title='장보기 식료품'
            filteredList={shoppingList}
            onCheckBoxPress={onCheckBoxPress}
            addToFridgePress={onAddToFridgePress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={() =>
              afterAnimation(onDeleteFoodPress, shoppingList)
            }
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox
              list={checkedList}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(shoppingList)}
            >
              <SquareIconBtn
                btnName='한번에 추가'
                icon='shape-square-rounded-plus'
                disabled={checkedList.length === 0}
                onPress={onAddAtOnceBtnPress}
              />
              <SquareIconBtn
                btnName='삭제'
                icon='trash-can'
                disabled={checkedList.length === 0}
                onPress={onDeleteBtnPress}
              />
            </TableSelectedHandleBox>

            <TextInputRoundedBox
              value={keyword}
              setValue={setKeyword}
              placeholder='식료품 이름을 작성해주세요.'
              onSubmitEditing={onSubmitEditing}
              disabled={keyword === ''}
              checkedListLength={checkedList.length}
            />
          </TableFooterContainer>

          <AddShoppingListFoodModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCheckedList={setCheckedList}
            formSteps={formFourSteps}
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
