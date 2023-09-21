import { View } from 'react-native';
import { Text } from './native-component';
import { useFindFood } from '../../hooks';
import { Space } from '../../constant/fridgeInfo';
import tw from 'twrnc';

interface Props {
  name: string;
  space?: Space;
  roundedBorder?: boolean;
}

export default function IndicatorExist({ name, space, roundedBorder }: Props) {
  const { findFood } = useFindFood();

  const existFood = findFood(name);

  const existFoodColor = existFood ? 'text-blue-600' : 'text-red-500';

  const borderStyle =
    'border border-blue-400 px-2 h-6.5 rounded-full items-center';

  return (
    <View style={tw`${roundedBorder ? borderStyle : ''} items-end`}>
      <Text
        style={tw`${existFoodColor} ${
          roundedBorder ? 'text-[13px] py-0' : 'text-[15px] py-0'
        }`}
      >
        {!!existFood ? '있음' : '없음'}
      </Text>
      {space && existFood && (
        <Text style={tw`text-xs text-slate-500 py-0`}>{space}</Text>
      )}
    </View>
  );
}
