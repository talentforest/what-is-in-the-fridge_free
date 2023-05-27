import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { addFood } from '../redux/slice/allFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
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

  const onAddSubmit = () => {
    const food: Food = {
      ...newFood,
      id: myUuid as string,
      space,
      compartmentNum,
    };

    const existFood = checkExistFood(food);
    if (existFood) return alertExistFood(existFood);

    if (food.favorite) {
      dispatch(addFavorite(food));
    }
    dispatch(addFood(food));
  };

  return {
    newFood,
    addFoodInfo,
    onAddSubmit,
  };
}
