import { Alert } from 'react-native';
import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';

export default function useCheckFood() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);

  const allExistFoods = [...fridgeFoods, ...freezerFoods];

  const checkExistFood = (food: Food) => {
    return allExistFoods.find((existFood) => existFood.name === food.name);
  };

  const alertExistFood = (food: Food) => {
    return Alert.alert(
      `${food.name}`,
      `${food.space} ${food.compartmentNum}에 이미 식료품이 있습니다.`
    );
  };

  return {
    checkExistFood,
    alertExistFood,
  };
}
