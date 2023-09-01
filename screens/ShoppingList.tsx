import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingList } from '../redux/slice/shoppingList';
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

import AddSelectFoodModal from '../screen-component/modal/AddSelectFoodModal';
import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import UUIDGenerator from 'react-native-uuid';

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

  return (
    <KeyboardAvoidingView>
      <Container>
        {/* 장보기 목록 */}
        <TableContainer color='blue'>
          <TableHeader
            title='장봐야할 식료품'
            entireChecked={
              checkedList.length === shoppingList.length && !!checkedList.length
            }
            onEntirePress={() => onEntireBoxPress(shoppingList)}
            color='blue'
            length={shoppingList.length}
          />

          <TableBody
            title='장보기 목록 식료품'
            color='blue'
            list={shoppingList}
            onCheckBoxPress={onCheckBoxPress}
            addToFridgePress={onAddToFridgePress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={() => afterAnimation(onDeletePress, shoppingList)}
          />

          <TableFooter
            list={checkedList}
            onDeletePress={() => {
              onDeletePress(shoppingList, setAnimationState, animationState);
            }}
            buttons={['delete']}
            color='blue'
          />
        </TableContainer>

        {/* 키보드 인풋 */}
        <TextInputRoundedBox
          value={keyword}
          setValue={setKeyword}
          iconName='plus'
          placeholder='식료품 이름을 작성해주세요.'
          onSubmitEditing={onInputSubmit}
          iconActive={keyword !== ''}
        />
        {modalVisible && (
          <AddSelectFoodModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCheckedList={setCheckedList}
            formSteps={[
              { id: 1, name: '식품 정보' },
              { id: 2, name: '식품 위치' },
              { id: 3, name: '식품 날짜' },
            ]}
          />
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
