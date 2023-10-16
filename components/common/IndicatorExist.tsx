import { View } from 'react-native';
import { Text } from './native-component';
import { useFindFood } from '../../hooks';
import { Space } from '../../constant/fridgeInfo';
import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  name: string;
  roundedBorder?: boolean;
  space?: Space;
  navigate?: boolean;
}

export default function IndicatorExist({
  name,
  space,
  navigate,
  roundedBorder,
}: Props) {
  const { findFood } = useFindFood();
  const existFood = findFood(name);

  const existFoodColor = existFood ? 'text-blue-600' : 'text-red-500';
  const borderStyle =
    'border border-blue-400 px-2 h-7.5 rounded-full items-center';

  return (
    <View style={tw`${roundedBorder ? borderStyle : ''} items-end`}>
      <View
        style={tw`flex-row items-center -gap-0.2 ${navigate ? 'h-full' : ''}`}
      >
        <Text
          style={tw`${existFoodColor} py-0 ${
            roundedBorder ? 'text-[13px] ' : 'text-[15px]'
          }`}
        >
          {!!existFood ? '있음' : '없음'}
        </Text>

        {existFood && navigate && (
          <Icon name='arrow-up-right' type='Feather' size={15} />
        )}
      </View>

      {space && existFood && (
        <Text style={tw`text-xs text-slate-500 py-0`}>{space}</Text>
      )}
    </View>
  );
}
