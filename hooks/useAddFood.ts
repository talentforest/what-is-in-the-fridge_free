import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo } from '../constant/foodInfo';
import { useState } from 'react';
import { addFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  initialFoodInfo: Food;
  foodLocation?: FoodLocation;
}

export const useAddFood = ({ initialFoodInfo, foodLocation }: Props) => {
  const [newFood, setNewFood] = useState<Food>(initialFoodInfo);

  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const changeFoodInfo = (info: FoodInfo) =>
    setNewFood({ ...newFood, ...info });

  const alertExistFood = (food: Food) => {
    const { exist, existInList } = alertPhraseWithFood(food);

    const guide = foodLocation ? exist : existInList;
    return Alert.alert(guide.title, guide.msg);
  };

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { noName, wrongDate } = alertPhrase;
    const { name, category, favorite } = newFood;

    const foodList: Food[] = foodLocation ? fridgeFoods : pantryFoods;

    const existFood = foodList.find((food) => food.name === name);
    if (existFood) return alertExistFood(existFood);

    if (name === '') return Alert.alert(noName.title, noName.msg);

    const { expiredDate, purchaseDate } = newFood;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    const favoriteListItem = favoriteFoods.find((food) => food.name === name);
    const foodToAdd = {
      ...newFood,
      id: favoriteListItem ? favoriteListItem.id : (myUuid as string),
      category: favoriteListItem ? favoriteListItem.category : category,
      favorite: favoriteListItem ? favoriteListItem.favorite : favorite,
    };

    const foodObj: Food = foodLocation
      ? {
          ...foodToAdd,
          space: foodLocation.space,
          compartmentNum: foodLocation.compartmentNum,
        }
      : { ...foodToAdd, space: '팬트리' };

    if (!favoriteListItem && foodToAdd.favorite) {
      dispatch(addFavorite(foodObj));
    }

    dispatch(
      foodLocation ? addFridgeFood(foodObj as Food) : addToPantry(foodObj)
    );
    setModalVisible(false);
  };

  return {
    newFood,
    changeFoodInfo,
    onAddSubmit,
  };
};
