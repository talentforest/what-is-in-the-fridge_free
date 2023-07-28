import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { addFood } from '../redux/slice/allFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';
import UUIDGenerator from 'react-native-uuid';
import useCheckFood from './useCheckFood';

interface Props {
  foodLocation: FoodLocation;
}

export default function useAddFood({ foodLocation }: Props) {
  const [newFood, setNewFood] = useState<Food>(initialFoodInfo);

  const { checkExistFood, alertExistFood } = useCheckFood();
  const dispatch = useDispatch();

  const { space, compartmentNum } = foodLocation;
  const myUuid = UUIDGenerator.v4();

  const addFoodInfo = (info: FoodInfo) => setNewFood({ ...newFood, ...info });

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const food: Food = {
      ...newFood,
      id: myUuid as string,
      space,
      compartmentNum,
    };

    if (food.name === '') {
      return Alert.alert(
        '이름 작성 안내',
        '식료품의 이름이 작성되지 않았습니다.'
      );
    }

    const existFood = checkExistFood(food);
    if (existFood) return alertExistFood(existFood);

    if (food.favorite) {
      dispatch(addFavorite(food));
    }
    dispatch(addFood(food));
    setModalVisible(false);
  };

  return {
    newFood,
    addFoodInfo,
    onAddSubmit,
  };
}
