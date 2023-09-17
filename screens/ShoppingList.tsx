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

import AddShoppingListFoodModal from '../screen-component/modal/AddShoppingListFoodModal';
import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableRecommendedFoods from '../components/table/TableRecommendedFoods';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import UUIDGenerator from 'react-native-uuid';
import SquareBtn from '../components/buttons/SquareIconBtn';

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const { checkedList, setCheckedList, onEntireBoxPress, onCheckBoxPress } =
    useHandleCheckList();

  const {
    onDeleteFoodPress,
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
            <TableHeader title='장보기 식료품' length={shoppingList.length} />

            <TableBody
              list={shoppingList}
              onCheckBoxPress={onCheckBoxPress}
              addToFridgePress={onAddToFridgePress}
              checkedList={checkedList}
              animationState={animationState}
              afterAnimation={() =>
                afterAnimation(onDeleteFoodPress, shoppingList)
              }
            />

            <TableRecommendedFoods
              keyword={keyword}
              setAnimationState={setAnimationState}
            />

            <View>
              <TableFooter
                list={checkedList}
                entireChecked={allChecked && !!checkedList.length}
                onEntirePress={() => onEntireBoxPress(shoppingList)}
              >
                <SquareBtn
                  icon='trash-can'
                  disabled={checkedList.length === 0}
                  onPress={() => {
                    onDeleteFoodPress(
                      setAnimationState,
                      animationState,
                      shoppingList
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
            <AddShoppingListFoodModal
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
