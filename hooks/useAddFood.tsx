import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { addFood } from '../redux/slice/allFoodsSlice';
import { Alert } from 'react-native';
import { CompartmentType } from '../constant/fridgeInfo';
import { removeFromShoppingList } from '../redux/slice/shoppingList';
import UUIDGenerator from 'react-native-uuid';
import useCheckFood from './useCheckFood';

interface Props {
  selectedFood?: Food;
  compartment?: CompartmentType;
}

export default function useAddFood({ selectedFood, compartment }: Props) {
  const [newFood, setNewFood] = useState<Food>(selectedFood || initialFoodInfo);
  const { checkExistFood, alertExistFood } = useCheckFood();
  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const addFoodInfo = (info: FoodInfo) => setNewFood({ ...newFood, ...info });

  const onAddSubmit = () => {
    const food: Food = {
      ...newFood,
      id: myUuid as string,
      space: compartment?.space || newFood.space,
      compartmentNum: compartment?.compartmentNum || newFood.compartmentNum,
    };

    if (checkExistFood(food)) {
      const existFood = checkExistFood(food);
      return existFood ? alertExistFood(existFood) : null;
    }

    if (food.favorite) {
      dispatch(addFavorite(food));
    }
    dispatch(addFood(food));

    if (selectedFood) {
      removeShoppingItem();
      Alert.alert(
        `${newFood.name}`,
        `${newFood.space} ${newFood.compartmentNum}에 추가되었습니다.`
      );
    }
  };

  const removeShoppingItem = () => {
    if (selectedFood?.image.length === 0) {
      dispatch(removeFromShoppingList({ name: newFood.name }));
    }
  };

  return {
    newFood,
    addFoodInfo,
    onAddSubmit,
  };
}
