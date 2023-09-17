import { View } from 'react-native';
import { Text } from './native-component';
import { useFindFood } from '../../hooks';
import tw from 'twrnc';

interface Props {
  name: string;
  roundedBorder?: boolean;
}

export default function IndicatorExist({ name, roundedBorder }: Props) {
  const { findFoodInFridge, findFoodInPantry } = useFindFood();

  const existFood = findFoodInPantry(name) || findFoodInFridge(name);

  const existFoodColor = existFood ? 'text-blue-600' : 'text-red-500';

  const borderStyle =
    'border border-blue-400 px-2 h-6.5 rounded-full items-center';

  return (
    <View style={tw`${roundedBorder ? borderStyle : ''}`}>
      <Text
        style={tw`${existFoodColor}  ${
          roundedBorder ? 'text-[13px] py-0' : 'text-[15px]'
        }`}
      >
        {!!existFood ? '있음' : '없음'}
      </Text>
    </View>
  );
}
