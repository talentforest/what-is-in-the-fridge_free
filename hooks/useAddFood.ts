import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { addFood } from '../redux/slice/allFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';

import useCheckFood from './useCheckFood';
import useFavoriteFoods from './useFavoriteFoods';

import UUIDGenerator from 'react-native-uuid';

interface Props {
  foodLocation: FoodLocation;
}

export default function useAddFood({ foodLocation }: Props) {
  const [newFood, setNewFood] = useState<Food>(initialFoodInfo);

  const { findFoodInFridge, alertExistFood } = useCheckFood();
  const { findFavoriteListItem } = useFavoriteFoods();
  const dispatch = useDispatch();

  const { space, compartmentNum } = foodLocation;
  const myUuid = UUIDGenerator.v4();

  const addFoodInfo = (info: FoodInfo) => setNewFood({ ...newFood, ...info });

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { name, category, favorite } = newFood;

    const existFood = findFoodInFridge(name);
    if (existFood) return alertExistFood(existFood);
    if (name === '')
      return Alert.alert(
        '이름 작성 안내',
        '식료품의 이름이 작성되지 않았습니다.'
      );
    const { expiredDate, purchaseDate } = newFood;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(
        '날짜 수정 알림',
        '유통기한이 구매일보다 이전일 수 없어요.'
      );
    }

    const favoriteListItem = findFavoriteListItem(name);
    const foodToAdd = {
      ...newFood,
      id: favoriteListItem ? favoriteListItem.id : (myUuid as string),
      category: favoriteListItem ? favoriteListItem.category : category,
      favorite: favoriteListItem ? favoriteListItem.favorite : favorite,
      space,
      compartmentNum,
    };

    if (!favoriteListItem && foodToAdd.favorite) {
      dispatch(addFavorite(foodToAdd));
    }

    dispatch(addFood(foodToAdd));
    setModalVisible(false);
  };

  return {
    newFood,
    addFoodInfo,
    onAddSubmit,
  };
}
