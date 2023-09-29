import { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { Keyboard, View } from 'react-native';
import {
  useHandleCheckList,
  useHandleTableItem,
  useSetAnimationState,
  useSubmitFoodsFromInput,
} from '../hooks';
import { formFourSteps } from '../constant/formInfo';

import AddShoppingListFoodModal from '../screen-component/modal/AddShoppingListFoodModal';
import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableRecommendedFoods from '../components/table/TableRecommendedFoods';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import SquareIconBtn from '../components/buttons/SquareIconBtn';

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const { checkedList, setCheckedList, onEntireBoxPress, onCheckBoxPress } =
    useHandleCheckList();

  const { onDeleteFoodPress, onAddToFridgePress } = useHandleTableItem({
    checkedList,
    setCheckedList,
    setModalVisible,
  });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const { onSubmitShoppingListItem } = useSubmitFoodsFromInput();

  const onInputSubmit = () => {
    if (keyword === '') return Keyboard.dismiss();
    onSubmitShoppingListItem(keyword, setAnimationState);
    setKeyword('');
  };

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
              onSubmitShoppingListItem={onSubmitShoppingListItem}
              setAnimationState={setAnimationState}
            />

            <TableFooter
              list={checkedList}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(shoppingList)}
            >
              <SquareIconBtn
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
              formSteps={formFourSteps}
            />
          )}
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
