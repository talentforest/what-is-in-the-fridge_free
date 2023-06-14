import { useState } from 'react';
import { Food } from '../constant/foods';
import { useDispatch, useSelector } from '../redux/hook';
import { Alert } from 'react-native';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { FoodType } from '../screens/ExpiredFoods';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import {
  addItemsToShoppingList,
  setShoppingList,
} from '../redux/slice/shoppingList';
import { useRoute } from '@react-navigation/native';

export default function useHandleCheckList(tab?: FoodType) {
  const route = useRoute();
  const [entireCheck, setEntireCheck] = useState(false);
  const [checkList, setCheckList] = useState<Food[]>([]);

  const { allFoods } = useSelector((state) => state.allFoods);
  const dispatch = useDispatch();

  const onEntirePress = (list: Food[]) => {
    setEntireCheck((prev) => !prev);
    return !entireCheck ? setCheckList(list) : setCheckList([]);
  };

  const onExistFoodPress = (food: Food, onModalPress: (food: Food) => void) => {
    const existFood = allFoods.find((item) => item.name === food.name);
    return Alert.alert(
      `기존 식료품 삭제 알림`,
      `기존의 "${food.name}" 식료품을 삭제하고 새로 추가하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'destructive',
        },
        {
          text: '삭제 후 추가',
          onPress: () => {
            if (existFood) {
              onModalPress(food);
            }
            return;
          },
          style: 'default',
        },
      ]
    );
  };

  const existInList = (id: string) => checkList.find((food) => food.id === id);

  const onCheckPress = (food: Food) => {
    if (existInList(food.id)) {
      return setCheckList(checkList.filter((item) => item.id !== food.id));
    }
    setCheckList([...checkList, food]);
  };

  const changeFavState = () => {
    return allFoods.map((food) => {
      const favFood = checkList.some((item) => item.id === food.id);
      return favFood ? { ...food, favorite: false } : food;
    });
  };

  const onDeletePress = (list: Food[]) => {
    const filteredArr = list.filter((food) => {
      return !checkList.some((checkFood) => checkFood.id === food.id);
    });

    Alert.alert(
      `${
        route.name === 'FavoriteFoods' ? '자주 먹는 식료품 해제' : '식료품 삭제'
      }`,
      `${
        route.name === 'FavoriteFoods'
          ? `${checkList.length}개의 식료품을 자주 먹는 식료품에서 해제하시겠습니까?`
          : route.name === 'ExpiredFoods'
          ? `${tab}에서 ${checkList.length}개의 식료품을 삭제하시겠습니까?`
          : route.name === 'ShoppingList'
          ? `장보기 목록에서 ${checkList.length}개의 식료품을 삭제하시겠습니까?`
          : ''
      }`,
      [
        {
          text: '취소',
          style: 'destructive',
        },
        {
          text: '삭제',
          onPress: () => {
            if (route.name === 'ExpiredFoods') {
              dispatch(setAllFoods(filteredArr));
            }
            if (route.name === 'FavoriteFoods') {
              dispatch(setAllFoods(changeFavState()));
              dispatch(setFavoriteList(filteredArr));
            }
            if (route.name === 'ShoppingList') {
              dispatch(setShoppingList(filteredArr));
            }
            setCheckList([]);
            setEntireCheck(false);
          },
          style: 'default',
        },
      ]
    );
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
    setEntireCheck(false);
  };

  return {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onCheckPress,
    onDeletePress,
    onEntirePress,
    onExistFoodPress,
    existInList,
    addShoppingListPress,
  };
}
