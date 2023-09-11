import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingList } from '../redux/slice/shoppingListSlice';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { initialFood } from '../constant/foodInfo';
import { Keyboard, View } from 'react-native';
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
import tw from 'twrnc';

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const myUuid = UUIDGenerator.v4();

  const dispatch = useDispatch();

  const { checkedList, setCheckedList, onEntireBoxPress, onCheckBoxPress } =
    useHandleCheckList();

  const {
    onDeletePress,
    onAddToFridgePress, //
  } = useHandleTableItem({ checkedList, setCheckedList, setModalVisible });

  const onInputSubmit = () => {
    if (keyword === '') return Keyboard.dismiss();

    const food = {
      ...initialFood,
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
      <SafeBottomAreaView>
        <Container>
          <TableContainer>
            <TableHeader
              title='장보기 식료품'
              length={shoppingList.length}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(shoppingList)}
            />

            <TableBody
              title='장보기 목록 식료품'
              list={shoppingList}
              onCheckBoxPress={onCheckBoxPress}
              addToFridgePress={onAddToFridgePress}
              checkedList={checkedList}
              animationState={animationState}
              afterAnimation={() => afterAnimation(onDeletePress, shoppingList)}
            />
            <View style={tw`mb-2`}>
              <TableFooter list={checkedList}>
                <SquareBtn
                  name='장보기 목록에서 삭제'
                  icon='trash-can'
                  disabled={checkedList.length === 0}
                  onPress={() => {
                    onDeletePress(
                      shoppingList,
                      setAnimationState,
                      animationState
                    );
                  }}
                />
              </TableFooter>
            </View>
          </TableContainer>

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
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
