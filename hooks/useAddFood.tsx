import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from '../redux/hook';
import { changeFreezer, changeFridge } from '../redux/slice/foodsListSlice';
import { NavigateProp } from '../navigation/Navigation';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { CompartmentNum, Space } from '../constant/fridge';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  space: Space;
  compartmentNum: CompartmentNum;
}

export default function useAddFood({ space, compartmentNum }: Props) {
  const myUuid = UUIDGenerator.v4();
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateProp>();

  const [newFood, setNewFood] = useState<Food>({
    ...initialFoodInfo,
    space,
    compartmentNum,
  });

  const changeFoodInfo = (newInfo: FoodInfo) => {
    return setNewFood({ ...newFood, ...newInfo });
  };

  const onSubmit = () => {
    const newFoodInfo = { ...newFood, id: myUuid };

    if (space.includes('냉장')) {
      dispatch(changeFridge([...fridgeFoods, newFoodInfo]));
    }
    if (space.includes('냉동')) {
      dispatch(changeFreezer([...freezerFoods, newFoodInfo]));
    }

    navigation.navigate('Compartments', { space });
  };

  return {
    newFood,
    changeFoodInfo,
    onSubmit,
  };
}
