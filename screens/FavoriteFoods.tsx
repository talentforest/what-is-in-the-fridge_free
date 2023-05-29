import { useFonts } from 'expo-font';
import { Alert, View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useDispatch, useSelector } from '../redux/hook';
import { useState } from 'react';
import { Category, foodCategories } from '../constant/foodCategories';
import { ScrollView } from 'react-native-gesture-handler';
import {
  SafeBottomAreaView,
  Text,
  TouchableOpacity,
} from '../components/native-component';
import { setShoppingList } from '../redux/slice/shoppingList';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { GRAY } from '../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyTag from '../components/common/EmptyTag';
import TableLabel from '../components/common/TableLabel';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import FoodListItem from '../components/common/FoodListItem';
import useCheckFood from '../hooks/useCheckFood';
import TableListContainer from '../components/common/TableListContainer';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [checkList, setCheckList] = useState<Food[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { checkExistFood } = useCheckFood();
  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const dispatch = useDispatch();

  const getCategoryList = (category: Category) => {
    return favoriteFoods.filter((food) => food.category === category);
  };

  const addShoppingListPress = () => {
    const existFood = checkList.find((food) => checkExistFood(food));
    if (existFood)
      return Alert.alert(
        `${existFood.name}`,
        `이미 ${existFood.space} ${existFood.compartmentNum}에 존재하고 있어 장보기 목록에 추가할 수 없습니다.`
      );
    dispatch(setShoppingList(checkList));
    setCheckList([]);
    Alert.alert(
      `총 ${checkList.length}개의 식료품 추가 완료`,
      `${checkList
        .map((food) => food.name)
        .join(', ')} 식료품이 장보기 목록에 추가되었습니다!`
    );
  };

  const changeFav = () => {
    return allFoods.map((food) => {
      if (checkList.some((item) => item.id === food.id)) {
        return { ...food, favorite: false };
      }
      return food;
    });
  };

  const onDeletePress = () => {
    dispatch(setAllFoods(changeFav()));

    const filteredArr = favoriteFoods.filter((item1) => {
      return !checkList.some((item2) => item2.id === item1.id);
    });

    dispatch(setFavoriteList(filteredArr));
    setCheckList([]);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView style={tw`flex-1 bg-neutral-50 pb-3 gap-1`}>
      {favoriteFoods.length !== 0 ? (
        <>
          <ScrollView contentContainerStyle={tw`mb-10 bg-white`}>
            {foodCategories.map(
              ({ category }) =>
                getCategoryList(category).length !== 0 && (
                  <TableListContainer key={category}>
                    <TableLabel
                      title={`카테고리 | ${category}`}
                      label='식료품 유무'
                    />
                    {getCategoryList(category).map((food) => (
                      <FoodListItem
                        key={food.id}
                        food={food}
                        checkList={checkList}
                        setCheckList={setCheckList}
                      >
                        {!checkExistFood(food) && (
                          <View style={tw`flex-row items-center gap-1 pl-2`}>
                            <Icon
                              name='fridge-off-outline'
                              size={18}
                              color={GRAY}
                            />
                          </View>
                        )}
                      </FoodListItem>
                    ))}
                  </TableListContainer>
                )
            )}
          </ScrollView>
          {!!checkList.length && (
            <View style={tw`gap-2 p-3 fixed w-full bottom-0 bg-white`}>
              <Text>선택 항목</Text>
              <TouchableOpacity
                onPress={() => onDeletePress()}
                style={tw`flex-row items-center gap-1.5 border border-indigo-300 p-2 rounded-md self-start bg-blue-200`}
              >
                <View style={tw`w-5 text-center items-center`}>
                  <Icon name='delete-outline' size={18} color={GRAY} />
                </View>
                <Text>자주 먹는 식료품에서 삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={tw`mb-4 h-24 bg-white rounded-lg border border-slate-300`}>
          <EmptyTag tagName='아직 유통기한이 임박한 식료품이 없습니다' />
        </View>
      )}
      {modalVisible && selectedFood && (
        <AddSelectFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeBottomAreaView>
  );
}
