import { View } from 'react-native';
import { Text } from '../../native-component';
import { caution } from '../../../constant/caution';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function ExpiredState({ length }: { length: number }) {
  const getCaution = (num: number) => caution.find((item) => item.max >= num);

  return (
    <View style={tw`flex-row items-center gap-1 py-2`}>
      <Icon
        name={length >= 3 ? 'fridge-alert-outline' : 'fridge-outline'}
        size={14}
        color={length >= 15 ? 'red' : length >= 3 ? 'orange' : 'green'}
      />
      <Text
        styletw={`${
          length >= 15
            ? 'text-red-600'
            : length >= 3
            ? 'text-amber-600'
            : 'text-green-700'
        } flex-1 text-xs`}
      >
        {getCaution(length)?.guide}
      </Text>
    </View>
  );
}
