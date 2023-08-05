import { Text } from '../../native-component';
import { caution, getColorByFoodLength } from '../../../constant/caution';
import { View } from 'react-native';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  length: number;
}

export default function ExpiredState({ length }: Props) {
  const getCaution = (num: number) => caution.find((item) => item.max >= num);

  return (
    <View style={tw`p-2.5 pb-0 flex-row items-center gap-1.5`}>
      <Icon name='message-text' type='MaterialCommunityIcons' size={14} />
      <Text fontSize={12} style={tw`${getColorByFoodLength(length)}`}>
        {getCaution(length)?.guide}
      </Text>
    </View>
  );
}
