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
import useToggleModal from '../hooks/useToggleModal';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import Container from '../components/LayoutBox/Container';
import TableContainer from '../components/common/Table/TableContainer';
import TableHeader from '../components/common/Table/TableHeader';
import TableBody from '../components/common/Table/TableBody';
import TableFooter from '../components/common/Table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const [keyword, setKeyword] = useState('');
  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const { modalVisible, setModalVisible, onModalPress } = useToggleModal();

  const totalLength = shoppingList.length;
  const {
    entireCheck,
    checkList,
    onDeletePress,
    onEntirePress,
    onExistFoodPress,
    onCheckPress,
    existInList,
  } = useHandleCheckList(totalLength);

  const { checkFavorite } = useFavoriteFoods();

  const { checkExistFood } = useCheckFood();

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
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(shoppingList)}
            columnTitle='추가'
          />

          <TableBody
            existListItem={!!shoppingList.length}
            list={shoppingList}
            onCheckPress={onCheckPress}
            existInList={existInList}
            noneItemNoti='장봐야할 식료품이 없습니다.'
            addToFridgePress={addToFridgePress}
          />

          <TableFooter
            list={checkList}
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
