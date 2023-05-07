import { useState } from 'react';
import { Food, FoodInfo } from '../constant/foods';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFreezer, changeFridge } from '../redux/slice/foodsListSlice';

export default function useChangeFoodInfo({ food }: { food: Food }) {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);
  const dispatch = useDispatch();
  const [foodInfo, setFoodInfo] = useState(food);
  const [editing, setEditing] = useState(false);

  const editFoodInfo = (newInfo: FoodInfo) => {
    return setFoodInfo({ ...foodInfo, ...newInfo });
  };

  const onEditSumbit = (foodId: string) => {
    const freezer = foodInfo.space.includes('냉동');
    const foodList = freezer ? freezerFoods : fridgeFoods;
    const changeFoodList = freezer ? changeFreezer : changeFridge;

    const editedList = foodList.map((food) => {
      if (food.id === foodId) return foodInfo;
      return food;
    });

    dispatch(changeFoodList(editedList));
    setEditing(false);
  };

  return {
    editing,
    setEditing,
    foodInfo,
    editFoodInfo,
    onEditSumbit,
  };
}
