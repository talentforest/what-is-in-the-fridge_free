import { View } from 'react-native';
import { Text } from './native-component';
import { useFindFood } from '../../hooks';
import tw from 'twrnc';

interface Props {
  isExist: boolean;
}

export default function IndicatorExist({ isExist }: Props) {
  return (
    <View style={tw.style(`flex-row items-center`)}>
      <Text
        fontSize={16}
        style={tw`${isExist ? 'text-blue-600' : 'text-red-500'}`}
      >
        {!!isExist ? '있음' : '없음'}
      </Text>
    </View>
  );
}
