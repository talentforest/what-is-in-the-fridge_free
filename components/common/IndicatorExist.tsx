import { Food } from '../../constant/foods';
import { Text } from './native-component';
import { useFindFood } from '../../hooks';
import tw from 'twrnc';

interface Props {
  food: Food;
  size?: 'xs';
}

export default function IndicatorExist({ food, size }: Props) {
  const { findFoodInFridge } = useFindFood();

  const existFoodColor = (food: Food) => {
    return !!findFoodInFridge(food.name) ? 'text-blue-600' : 'text-red-500';
  };

  return (
    <Text style={tw`${existFoodColor(food)} text-sm`}>
      {!!findFoodInFridge(food.name) ? '있음' : '없음'}
    </Text>
  );
}
