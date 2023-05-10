import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { CompartmentNum, Space } from '../constant/fridge';
import { addFood } from '../redux/slice/allFoodsSlice';
import { Alert } from 'react-native';
import { getISODate } from '../util';
import UUIDGenerator from 'react-native-uuid';
import useCheckFood from './useCheckFood';

interface Props {
  space?: Space;
  compartmentNum?: CompartmentNum;
}

export default function useAddFood({ space, compartmentNum }: Props) {
  const { checkExistFood } = useCheckFood();
  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  // 새로운 식료품 추가
  const initialFood = { ...initialFoodInfo, space, compartmentNum };
  const [newFood, setNewFood] = useState(initialFood as Food);

  const changeFoodInfo = (newInfo: FoodInfo) => {
    return setNewFood({ ...newFood, ...newInfo });
  };

  const onSubmitFromForm = () => {
    const newFoodInfo: Food = { ...newFood, id: myUuid as string };
    if (newFoodInfo.favorite) {
      dispatch(addFavorite(newFoodInfo));
    }
    dispatch(addFood(newFoodInfo));
  };

  // FoodSpaceModal에서 식료품 추가
  const onSubmitFromSpaceModal = (space: Space, food: Food) => {
    if (checkExistFood(food)) {
      return Alert.alert(
        `${food.name}`,
        `${food.space} ${food.compartmentNum}에 이미 식료품이 있습니다.`
      );
    }

    const favoriteFoodInfo: Food = {
      ...food,
      expirationDate: getISODate(new Date()),
      purchaseDate: getISODate(new Date()),
      space,
      compartmentNum: '1번',
      id: myUuid as string,
    };
    dispatch(addFood(favoriteFoodInfo));
    Alert.alert(`${food.name} 추가`, `${space} 1번에 추가되었습니다.`);
  };

  return {
    newFood,
    changeFoodInfo,
    onSubmitFromForm,
    onSubmitFromSpaceModal,
  };
}
