import { useDispatch, useSelector } from '../redux/hook';
import { Food, FoodInfo } from '../constant/foodInfo';
import { useState } from 'react';
import { addFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import { addFavorite, editFavorite } from '../redux/slice/favoriteFoodsSlice';
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
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const changeFoodInfo = (info: FoodInfo) =>
    setNewFood({ ...newFood, ...info });

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { name, category, expiredDate, purchaseDate, memo } = newFood;

    const { noName, wrongDate, noMemo } = alertPhrase;

    if (name === '') return Alert.alert(noName.title, noName.msg);

    const foodList = foodLocation ? fridgeFoods : pantryFoods;
    const existFood = foodList.find((food) => food.name === name);

    if (existFood) {
      const { exist, existInList } = alertPhraseWithFood(existFood);
      const guide = foodLocation ? exist : existInList;
      return Alert.alert(guide.title, guide.msg);
    }

    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    if (isMemoOpen && memo === '') {
      return Alert.alert(noMemo.title, noMemo.msg);
    }

    const isFavoriteItem = favoriteFoods.find((food) => food.name === name);

    const foodToAdd = {
      ...newFood,
      id: isFavoriteItem ? isFavoriteItem.id : (myUuid as string),
      category: isFavoriteItem ? isFavoriteItem.category : category,
      space: foodLocation ? foodLocation.space : '팬트리',
    };

    if (isFavoriteItem) {
      // 자주 먹는 식료품에 먼저 추가 후, 냉장고나 팬트리에 추가할 시 공간 정보도 함께 변경.
      dispatch(editFavorite(foodToAdd));
    }

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
