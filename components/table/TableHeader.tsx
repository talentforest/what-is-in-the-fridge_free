import { View } from 'react-native';
import { MEDIUM_BLUE } from '../../constant/colors';
import { Text } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  length: number;
}

export default function TableHeader({ length }: Props) {
  return (
    <View style={tw`px-2 pb-2.5 flex-row gap-1 justify-between items-center`}>
      <View style={tw`flex-row gap-1 items-center`}>
        <Icon
          name='list-unordered'
          type='Octicons'
          size={13}
          color={MEDIUM_BLUE}
        />
        <Text fontSize={15} style={tw`text-blue-400`}>
          목록별 식료품 전체 {`(${length}개)`}
        </Text>
      </View>
      <Text fontSize={14} style={tw`text-blue-400`}>
        소비기한순
      </Text>
    </View>
  );
}
