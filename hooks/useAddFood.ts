import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, PantryFood } from '../constant/foodInfo';
import { useState } from 'react';
import { addFood } from '../redux/slice/allFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  initialFoodInfo: Food | PantryFood;
  foodLocation?: FoodLocation;
}

export const useAddFood = ({ initialFoodInfo, foodLocation }: Props) => {
  const [newFood, setNewFood] = useState<Food | PantryFood>(initialFoodInfo);

  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const changeFoodInfo = (info: FoodInfo) =>
    setNewFood({ ...newFood, ...info });

  const alertExistFood = (food: Food | PantryFood) => {
    if (foodLocation) {
      return Alert.alert(
        `${food.name}`,
        `${food.space} ${(food as Food).compartmentNum}에 이미 식료품이 있어요.`
      );
    }
    return Alert.alert(`${food.name}`, '이미 목록에 있어요.');
  };

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { name, category, favorite } = newFood;

    const foodList: (Food | PantryFood)[] = foodLocation
      ? allFoods
      : pantryFoods;

    const existFood = foodList.find((food) => food.name === name);
    if (existFood) return alertExistFood(existFood);

    if (name === '')
      return Alert.alert(
        '이름 작성 안내',
        '식료품의 이름이 작성되지 않았어요.'
      );

    const { expiredDate, purchaseDate } = newFood;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(
        '날짜 수정 알림',
        '유통기한이 구매일보다 이전일 수 없어요.'
      );
    }

    const favoriteListItem = favoriteFoods.find((food) => food.name === name);
    const foodToAdd = {
      ...newFood,
      id: favoriteListItem ? favoriteListItem.id : (myUuid as string),
      category: favoriteListItem ? favoriteListItem.category : category,
      favorite: favoriteListItem ? favoriteListItem.favorite : favorite,
    };

    const foodObj: Food | PantryFood = foodLocation
      ? ({
          ...foodToAdd,
          space: foodLocation.space,
          compartmentNum: foodLocation.compartmentNum,
        } as Food)
      : ({ ...foodToAdd, space: '펜트리' } as PantryFood);

    if (!favoriteListItem && foodToAdd.favorite) {
      dispatch(addFavorite(foodObj));
    }

    dispatch(
      foodLocation
        ? addFood(foodObj as Food)
        : addToPantry(foodObj as PantryFood)
    );

    setModalVisible(false);
  };

  return {
    newFood,
    changeFoodInfo,
    onAddSubmit,
  };
};
