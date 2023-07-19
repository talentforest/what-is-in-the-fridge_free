import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingList } from '../redux/slice/shoppingList';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/native-component';
import { useSelector } from '../redux/hook';
import { DEEP_GRAY, LIGHT_GRAY } from '../constant/colors';
import { Food, initialFoodInfo } from '../constant/foods';
import { View } from 'react-native';
import TableLabel from '../components/common/Table/TableLabel';
import TableItem from '../components/common/Table/TableItem';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import useCheckFood from '../hooks/useCheckFood';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useToggleModal from '../hooks/useToggleModal';
import TableItemSetting from '../components/common/Table/TableItemSetting';
import TableList from '../components/common/Table/TableList';
import Icon from '../components/native-component/Icon';
import TextInputBox from '../components/common/TextInputBox';
import UUIDGenerator from 'react-native-uuid';
import TableContainer from '../components/common/Table/TableContainer';
import Container from '../components/common/LayoutBox/Container';
import tw from 'twrnc';
import useFavoriteFoods from '../hooks/useFavoriteFoods';

export default function ShoppingList() {
  const [keyword, setKeyword] = useState('');
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const {
    entireCheck,
    checkList,
    onDeletePress,
    onEntirePress,
    onExistFoodPress,
    onCheckPress,
    existInList,
  } = useHandleCheckList();
  const { checkFavorite } = useFavoriteFoods();
  const { checkExistFood } = useCheckFood();
  const { modalVisible, setModalVisible, onModalPress } = useToggleModal();

  const addToFridgePress = (food: Food) => {
    const favorite = checkFavorite(food);
    const selectedFood = { ...food, favorite } as Food;

    checkExistFood(food)
      ? onExistFoodPress(selectedFood, onModalPress)
      : onModalPress(selectedFood);
  };

  const onSubmitEditing = () => {
    if (keyword === '') return;
    dispatch(
      addToShoppingList({
        ...initialFoodInfo,
        id: myUuid as string,
        name: keyword,
      })
    );
    setKeyword('');
  };

  return (
    <KeyboardAvoidingView>
      <Container>
        {/* 장보기 목록 */}
        <TableContainer>
          <TableLabel
            title='장봐야할 식료품'
            listLength={shoppingList.length}
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(shoppingList)}
          >
            <View
              style={tw`justify-end flex-row items-center gap-0.5 rounded-full`}
            >
              <Text style={tw`text-slate-600`}>추가</Text>
            </View>
          </TableLabel>
          {shoppingList.length !== 0 ? (
            <TableList
              list={shoppingList}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  onCheckPress={onCheckPress}
                  existInList={existInList}
                  image={false}
                >
                  <TouchableOpacity
                    onPress={() => addToFridgePress(item)}
                    style={tw`p-1.5`}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={22}
                      color={checkExistFood(item) ? LIGHT_GRAY : DEEP_GRAY}
                    />
                  </TouchableOpacity>
                </TableItem>
              )}
            />
          ) : (
            <Text style={tw`text-slate-500 text-center mt-22 flex-1`}>
              아직 장보기 목록이 없습니다.
            </Text>
          )}
          <TableItemSetting
            list={checkList}
            onPress={() => onDeletePress(shoppingList)}
            buttons={['delete']}
          />
        </TableContainer>
        {/* 키보드 인풋 */}
        <TextInputBox
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
        />
      )}
    </KeyboardAvoidingView>
  );
}
