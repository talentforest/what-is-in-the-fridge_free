import { useFonts } from 'expo-font';
import { Alert, View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useDispatch, useSelector } from '../redux/hook';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { addItemsToShoppingList } from '../redux/slice/shoppingList';
import TableLabel from '../components/common/TableLabel';
import FixedBtn from '../components/common/FixedBtn';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/TableTotalItem';
import TableContainer from '../components/common/TableContainer';
import TableItem from '../components/common/TableItem';
import ExistFoodMark from '../components/common/ExistFoodMark';
import useCheckFood from '../hooks/useCheckFood';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);

  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const {
    entireCheck,
    setEntireCheck,
    checkList,
    onCheckPress,
    existInList,
    setCheckList,
    onEntirePress,
    onDeletePress,
  } = useHandleCheckList();
  const { checkExistFood } = useCheckFood();

  const dispatch = useDispatch();

  const addShoppingListPress = () => {
    dispatch(addItemsToShoppingList(checkList));
    Alert.alert(
      '장보기 목록 추가',
      `${checkList
        .map((food) => food.name)
        .join(', ')} 식료품이 추가되었습니다.`
    );
    setCheckList([]);
    setEntireCheck(false);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView style={tw`flex-1 bg-neutral-50`}>
      <View style={tw`flex-1 pb-4 mx-4`}>
        <View
          style={tw`bg-white px-4 flex-1 rounded-lg border border-slate-300`}
        >
          <TableLabel title='식료품' label='식료품 유무' />
          {favoriteFoods.length !== 0 ? (
            <TableContainer
              list={favoriteFoods}
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
            <Text styletw='text-slate-500 text-center mt-22'>
              자주 먹는 식료품이 없습니다.
            </Text>
          )}
          {!!favoriteFoods.length && (
            <TableTotalItem
              onEntirePress={() => onEntirePress(favoriteFoods)}
              list={favoriteFoods}
              entireCheck={entireCheck}
            />
          )}
        </View>

        {!!checkList.length && (
          <FixedBtn
            btnName='자주 먹는 식료품 해제'
            onDeletePress={() => onDeletePress(favoriteFoods)}
            addShoppingListPress={addShoppingListPress}
            listLength={favoriteFoods.length}
          />
        )}
      </View>
    </SafeBottomAreaView>
  );
}
