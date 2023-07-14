import { useFonts } from 'expo-font';
import { Alert, KeyboardAvoidingView, View } from 'react-native';
import { useState } from 'react';
import { fonts } from '../constant/fonts';
import { useDispatch } from '../redux/hook';
import {
  SafeBottomAreaView,
  Text,
  TouchableOpacity,
} from '../components/native-component';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, initialFoodInfo } from '../constant/foods';
import TableLabel from '../components/common/Table/TableLabel';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/Table/TableItemSetting';
import TableList from '../components/common/Table/TableList';
import TableItem from '../components/common/Table/TableItem';
import ExistFoodMark from '../components/common/ExistFoodMark';
import useCheckFood from '../hooks/useCheckFood';
import SquareBtn from '../components/common/Buttons/SquareBtn';
import UUIDGenerator from 'react-native-uuid';
import useFavoriteFoods from '../hooks/useFavoriteFoods';
import tw from 'twrnc';
import { scaleH } from '../util';
import TableContainer from '../components/common/Table/TableContainer';
import Container from '../components/common/LayoutBox/Container';
import TableItemSetting from '../components/common/Table/TableItemSetting';
import Icon from '../components/native-component/Icon';
import { DEEP_INDIGO, LIGHT_GRAY } from '../constant/colors';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [keyword, setKeyword] = useState('');
  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const {
    favoriteFoods,
    nonExistFavoriteFoods,
    existFavoriteFoods, //
  } = useFavoriteFoods();

  const onSubmitEditing = () => {
    const foodToAdd: Food = {
      ...initialFoodInfo,
      name: keyword,
      id: myUuid as string,
    };
    dispatch(addFavorite(foodToAdd));
    Alert.alert('추가 알림', '성공적으로 추가되었습니다.');
  };

  const {
    entireCheck,
    checkList,
    onCheckPress,
    existInList,
    onEntirePress,
    onDeletePress,
    addShoppingListPress,
  } = useHandleCheckList();
  const { checkExistFood } = useCheckFood();

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableLabel
            title='식료품'
            label='식료품 유무'
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(favoriteFoods)}
          />
          {favoriteFoods.length !== 0 ? (
            <TableList
              list={[...nonExistFavoriteFoods, ...existFavoriteFoods]}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  onCheckPress={onCheckPress}
                  existInList={existInList}
                >
                  <ExistFoodMark exist={!!checkExistFood(item)} />
                </TableItem>
              )}
            />
          ) : (
            <Text style={tw`text-slate-500 text-center mt-22`}>
              자주 먹는 식료품이 없습니다.
            </Text>
          )}
          <TableItemSetting
            list={checkList}
            onAddPress={addShoppingListPress}
            onPress={() => onDeletePress(favoriteFoods)}
            buttons={['delete-favorite', 'add-shopping-list']}
          />
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
