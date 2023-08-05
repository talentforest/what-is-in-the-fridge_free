import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingList } from '../redux/slice/shoppingList';
import { KeyboardAvoidingView } from '../components/native-component';
import { useSelector } from '../redux/hook';
import { Food, initialFoodInfo } from '../constant/foods';
import { FormStep } from '../constant/formInfo';
import UUIDGenerator from 'react-native-uuid';

import useFavoriteFoods from '../hooks/useFavoriteFoods';
import useCheckFood from '../hooks/useCheckFood';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useDeleteTableItem from '../hooks/useDeleteTableItem';
import useToggleModal from '../hooks/useToggleModal';

import AddSelectFoodModal from '../components/screen-component/modal/AddSelectFoodModal';
import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import TextInputRoundedBox from '../components/common/boxes/TextInputRoundedBox';
import { Alert } from 'react-native';

export default function ShoppingList() {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const [keyword, setKeyword] = useState('');

  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const { modalVisible, setModalVisible, onModalPress } = useToggleModal();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress,
    isCheckedItem,
  } = useHandleCheckList();

  const { onDeletePress } = useDeleteTableItem(checkedList, setCheckedList);

  const { checkFavorite } = useFavoriteFoods();

  const { checkExistFood } = useCheckFood();

  const onExistFoodPress = (food: Food, onModalPress: (food: Food) => void) => {
    const existFood = allFoods.find((item) => item.name === food.name);
    const onPress = () => {
      if (existFood) {
        onModalPress(food);
      }
      return;
    };
    return Alert.alert(
      `기존 식료품 삭제 알림`,
      `기존의 "${food.name}" 식료품을 삭제하고 새로 추가하시겠습니까?`,
      [
        { text: '취소', style: 'destructive' },
        { text: '삭제 후 추가', onPress, style: 'default' },
      ]
    );
  };

  const addToFridgePress = (food: Food) => {
    const favorite = checkFavorite(food);
    const selectedFood = { ...food, favorite } as Food;
    checkExistFood(food)
      ? onExistFoodPress(selectedFood, onModalPress)
      : onModalPress(selectedFood);
  };

  const onSubmitEditing = () => {
    if (keyword === '') return;
    const food = {
      ...initialFoodInfo,
      id: myUuid as string,
      name: keyword,
    };
    dispatch(addToShoppingList(food));
    setKeyword('');
  };

  return (
    <KeyboardAvoidingView>
      <Container>
        {/* 장보기 목록 */}
        <TableContainer>
          <TableHeader
            title='장봐야할 식료품'
            listLength={shoppingList.length}
            entireChecked={checkedList.length === shoppingList.length}
            onEntirePress={() => onEntireBoxPress(shoppingList)}
            columnTitle='추가'
          />

          <TableBody
            list={shoppingList}
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
            addToFridgePress={addToFridgePress}
          />

          <TableFooter
            list={checkedList}
            onPress={() => onDeletePress(shoppingList)}
            buttons={['delete']}
          />
        </TableContainer>

        {/* 키보드 인풋 */}
        <TextInputRoundedBox
          value={keyword}
          setValue={setKeyword}
          iconName='plus'
          placeholder='식료품 이름을 작성해주세요.'
          onSubmitEditing={onSubmitEditing}
        />
      </Container>
      {modalVisible && (
        <AddSelectFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formSteps={
            [
              { id: 1, name: '식품 정보' },
              { id: 2, name: '식품 위치' },
              { id: 3, name: '식품 날짜' },
            ] as FormStep[]
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}
