import { Food } from '../../constant/foods';
import { Text } from '../native-component';
import useCheckFood from '../../hooks/useCheckFood';
import tw from 'twrnc';

interface Props {
  food: Food;
  size?: 'sm';
}

export default function IndicatorExist({ food, size }: Props) {
  const { checkExistFood } = useCheckFood();

  const existFoodColor = (food: Food) => {
    return !!checkExistFood(food) ? 'text-blue-500' : 'text-red-500';
  };

  return (
    <Text
      style={tw`${existFoodColor(food)}`}
      fontSize={size === 'sm' ? 12 : 13}
    >
      {!!checkExistFood(food) ? '있음' : '없음'}
    </Text>
  );
}
