import { useDispatch, useSelector } from '../redux/hook';
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

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { name, category, expiredDate, purchaseDate } = newFood;
    const { noName, wrongDate } = alertPhrase;

    if (name === '') return Alert.alert(noName.title, noName.msg);

    const foodList: Food[] = foodLocation ? fridgeFoods : pantryFoods;
    const existFood = foodList.find((food) => food.name === name);

    if (existFood) {
      const { exist, existInList } = alertPhraseWithFood(existFood);
      const guide = foodLocation ? exist : existInList;
      return Alert.alert(guide.title, guide.msg);
    }

    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    const isFavoriteItem = favoriteFoods.find((food) => food.name === name);
    const foodToAdd = {
      ...newFood,
      id: isFavoriteItem ? isFavoriteItem.id : (myUuid as string),
      category: isFavoriteItem ? isFavoriteItem.category : category,
      space: foodLocation ? foodLocation.space : '팬트리',
    };

    dispatch(
      foodLocation
        ? addFridgeFood({
            ...foodToAdd,
            compartmentNum: foodLocation.compartmentNum,
          })
        : addToPantry(foodToAdd)
    );
    setModalVisible(false);
  };

  return {
    newFood,
    changeFoodInfo,
    onAddSubmit,
  };
};
