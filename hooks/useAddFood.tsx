import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { CompartmentNum, Space } from '../constant/fridge';
import { addFood } from '../redux/slice/allFoodsSlice';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  food?: Food;
  space: Space;
  compartmentNum: CompartmentNum;
}

export default function useAddFood({ food, space, compartmentNum }: Props) {
  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const foodInfo = food ? food : initialFoodInfo;
  const [newFood, setNewFood] = useState<Food>({
    ...foodInfo,
    space,
    compartmentNum,
  });

  const changeFoodInfo = (newInfo: FoodInfo) => {
    return setNewFood({ ...newFood, ...newInfo });
  };

  const onSubmit = () => {
    const newFoodInfo: Food = { ...newFood, id: myUuid as string };

    if (newFoodInfo.favorite) {
      dispatch(addFavorite(newFoodInfo));
    }
    dispatch(addFood(newFoodInfo));
  };

  return {
    newFood,
    changeFoodInfo,
    onSubmit,
  };
}
