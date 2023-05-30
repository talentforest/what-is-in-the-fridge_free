import { useFonts } from 'expo-font';
import { Alert, View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useDispatch, useSelector } from '../redux/hook';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { INACTIVE_COLOR, ORANGE_RED } from '../constant/colors';
import { addItemsToShoppingList } from '../redux/slice/shoppingList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyTag from '../components/common/EmptyTag';
import TableLabel from '../components/common/TableLabel';
import FoodListItem from '../components/common/FoodListItem';
import useCheckFood from '../hooks/useCheckFood';
import TableListContainer from '../components/common/TableListContainer';
import FixedBtn from '../components/common/FixedBtn';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [checkList, setCheckList] = useState<Food[]>([]);

  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

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
    <SafeBottomAreaView style={tw`flex-1 bg-neutral-50 pb-3 gap-1`}>
      {favoriteFoods.length !== 0 ? (
        <>
          <ScrollView contentContainerStyle={tw`mb-10 bg-white`}>
            <TableListContainer>
              <TableLabel title={'냉동실 식료품'} label='식료품 유무' />
              {favoriteFoods.map((food) => (
                <FoodListItem
                  key={food.id}
                  food={food}
                  checkList={checkList}
                  setCheckList={setCheckList}
                >
                  <View style={tw`flex-row items-center gap-1 pl-2`}>
                    <Icon
                      name={
                        checkExistFood(food)
                          ? 'fridge-outline'
                          : 'fridge-off-outline'
                      }
                      size={15}
                      color={checkExistFood(food) ? INACTIVE_COLOR : ORANGE_RED}
                    />
                    <Text
                      styletw={`${
                        checkExistFood(food)
                          ? 'text-slate-400'
                          : 'text-orange-600'
                      }`}
                    >
                      {checkExistFood(food) ? '있음' : '없음'}
                    </Text>
                  </View>
                </FoodListItem>
              ))}
            </TableListContainer>
          </ScrollView>
          {!!checkList.length && (
            <FixedBtn
              btnName='자주 먹는 식료품 해제'
              onDeletePress={onDeletePress}
              addShoppingListPress={addShoppingListPress}
            />
          )}
        </>
      ) : (
        <View style={tw`mb-4 h-24 bg-white rounded-lg border border-slate-300`}>
          <EmptyTag tagName='아직 자주 먹는 식료품 정보가 없습니다' />
        </View>
      )}
    </SafeBottomAreaView>
  );
}
