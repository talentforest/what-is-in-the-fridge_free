import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingList } from '../redux/slice/shoppingListSlice';
import { KeyboardAvoidingView } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { initialFoodInfo } from '../constant/foods';
import { useFocusEffect } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import {
  useHandleCheckList,
  useHandleTableItem,
  useSetAnimationState,
} from '../hooks';
import { formThreeSteps } from '../constant/formInfo';

import AddSelectFoodModal from '../screen-component/modal/AddSelectFoodModal';
import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import UUIDGenerator from 'react-native-uuid';
import SquareBtn from '../components/buttons/SquareBtn';

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const myUuid = UUIDGenerator.v4();

  const dispatch = useDispatch();

  const { checkedList, setCheckedList, onEntireBoxPress, onCheckBoxPress } =
    useHandleCheckList();

  useFocusEffect(
    useCallback(() => {
      setCheckedList([]);
    }, [])
  );

  const {
    onDeletePress,
    onAddToFridgePress, //
  } = useHandleTableItem({ checkedList, setCheckedList, setModalVisible });

  const onInputSubmit = () => {
    if (keyword === '') return Keyboard.dismiss();

    const food = {
      ...initialFoodInfo,
      id: myUuid as string,
      name: keyword,
    };
    dispatch(addToShoppingList(food));
    setKeyword('');
    setAnimationState('slidedown-in');
  };

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const allChecked = checkedList.length === shoppingList.length;

  return (
    <KeyboardAvoidingView>
      <Container>
        {/* 장보기 목록 */}
        <TableContainer>
          <TableHeader title='식료품 목록' length={shoppingList.length} />

          <TableBody
            title='장보기 목록 식료품'
            list={shoppingList}
            onCheckBoxPress={onCheckBoxPress}
            addToFridgePress={onAddToFridgePress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={() => afterAnimation(onDeletePress, shoppingList)}
          />
          <TableFooter
            list={checkedList}
            entireChecked={allChecked && !!checkedList.length}
            onEntirePress={() => onEntireBoxPress(shoppingList)}
          >
            <SquareBtn
              name='장보기 목록에서 삭제'
              icon='trash-can'
              disabled={checkedList.length === 0}
              onPress={() => {
                onDeletePress(shoppingList, setAnimationState, animationState);
              }}
            />
            <SquareBtn
              name='냉장실 문쪽 한번에 추가'
              icon='trash-can'
              disabled={checkedList.length === 0}
              onPress={() => {
                onDeletePress(shoppingList, setAnimationState, animationState);
              }}
            />
          </TableFooter>
        </TableContainer>

        {/* 키보드 인풋 */}
        <TextInputRoundedBox
          value={keyword}
          setValue={setKeyword}
          iconName='plus'
          placeholder='식료품 이름을 작성해주세요.'
          onSubmitEditing={onInputSubmit}
          disabled={keyword === ''}
        />

        {modalVisible && (
          <AddSelectFoodModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCheckedList={setCheckedList}
            formSteps={formThreeSteps}
          />
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
