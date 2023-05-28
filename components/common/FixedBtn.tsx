import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { GRAY } from '../../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

interface Props {
  onDeletePress: () => void;
  btnName: '자주 먹는 식료품에서 삭제' | '';
}

export default function FixedBtn({ onDeletePress, btnName }: Props) {
  return (
    <View style={tw`gap-2 p-3 fixed w-full bottom-0 bg-white`}>
      <Text>선택 항목</Text>
      <TouchableOpacity
        onPress={onDeletePress}
        style={tw`flex-row items-center gap-1.5 border border-indigo-300 p-2 rounded-md self-start bg-blue-200`}
      >
        <View style={tw`w-5 text-center items-center`}>
          <Icon name='delete-outline' size={18} color={GRAY} />
        </View>
        <Text>{btnName}</Text>
      </TouchableOpacity>
    </View>
  );
}
