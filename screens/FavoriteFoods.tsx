import { useFonts } from 'expo-font';
import { Alert, FlatList, View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useDispatch, useSelector } from '../redux/hook';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { addItemsToShoppingList } from '../redux/slice/shoppingList';
import TableLabel from '../components/common/TableLabel';
import TableItem from '../components/common/TableItem';
import useCheckFood from '../hooks/useCheckFood';
import FixedBtn from '../components/common/FixedBtn';
import ExistFoodMark from '../components/common/ExistFoodMark';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/TableTotalItem';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);

  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onEntirePress,
  } = useHandleCheckList();

  const { checkExistFood } = useCheckFood();

  const dispatch = useDispatch();

  const changeFavState = () => {
    return allFoods.map((food) => {
      if (checkList.some((item) => item.id === food.id)) {
        return { ...food, favorite: false };
      }
      return food;
    });
  };

  const onDeletePress = () => {
    dispatch(setAllFoods(changeFavState()));

    const filteredArr = favoriteFoods.filter((item1) => {
      return !checkList.some((item2) => item2.id === item1.id);
    });

    dispatch(setFavoriteList(filteredArr));
    setCheckList([]);
  };

  const addShoppingListPress = () => {
    dispatch(addItemsToShoppingList(checkList));
    Alert.alert(
      '장보기 목록 추가',
      `${checkList
        .map((food) => food.name)
        .join(', ')} 식료품이 추가되었습니다.`
    );
    setCheckList([]);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView style={tw`flex-1 bg-neutral-50`}>
      <View style={tw`flex-1 pb-2`}>
        <View style={tw`flex-1 bg-white px-4`}>
          <TableLabel title='식료품' label='식료품 유무' />
          {favoriteFoods.length !== 0 ? (
            <FlatList
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              data={favoriteFoods}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  checkList={checkList}
                  setCheckList={setCheckList}
                  setEntireCheck={setEntireCheck}
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
        </View>
        {!!favoriteFoods.length && (
          <TableTotalItem
            label={`총 ${favoriteFoods.length}개의 자주 먹는 식료품`}
            onEntirePress={() => onEntirePress(favoriteFoods)}
            list={favoriteFoods}
            entireCheck={entireCheck}
          />
        )}
        {!!checkList.length && (
          <FixedBtn
            btnName='자주 먹는 식료품 해제'
            onDeletePress={onDeletePress}
            addShoppingListPress={addShoppingListPress}
            listLength={favoriteFoods.length}
          />
        )}
      </View>
    </SafeBottomAreaView>
  );
}
