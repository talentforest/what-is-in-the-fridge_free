import { useDispatch, useSelector } from '../redux/hook';
import { Food, FoodInfo } from '../constant/foodInfo';
import { useState } from 'react';
import { addFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  initialFood: Food;
  foodLocation?: FoodLocation;
}

export const useAddFood = ({ initialFood, foodLocation }: Props) => {
  const [newFood, setNewFood] = useState<Food>(initialFood);

  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { isFavorite } = useSelector((state) => state.isFavorite);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const changeFoodInfo = (info: FoodInfo) =>
    setNewFood({ ...newFood, ...info });

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { name, category, expiredDate, purchaseDate } = newFood;

    const { noName, wrongDate } = alertPhrase;
    const foodList = foodLocation ? fridgeFoods : pantryFoods;
    const existFood = foodList.find((food) => food.name === name);

    if (name === '') return Alert.alert(noName.title, noName.msg);

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

    if (isFavorite) {
      dispatch(addFavorite(foodToAdd));
    }

    dispatch(
      foodLocation
        ? addFridgeFood({
            ...foodToAdd,
            compartmentNum: foodLocation.compartmentNum,
          })
        : addToPantry(foodToAdd)
    );
    setModalVisible(false);
    setNewFood(initialFood);
  };

  return {
    newFood,
    changeFoodInfo,
    onAddSubmit,
  };
};
