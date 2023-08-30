import { Alert } from 'react-native';
import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';

export default function useCheckFood() {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const findFoodInFridge = (name: string) => {
    return allFoods.find((food) => food.name === name);
  };

  const checkExistShoppingList = (food: Food) => {
    return shoppingList.find((existFood) => existFood.name === food.name);
  };

  const alertExistFood = (food: Food) => {
    return Alert.alert(
      `${food.name}`,
      `${food.space} ${food.compartmentNum}에 이미 식료품이 있습니다.`
    );
  };

  return {
    findFoodInFridge,
    alertExistFood,
    checkExistShoppingList,
  };
}
