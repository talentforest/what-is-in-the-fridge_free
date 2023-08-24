import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  title?: string;
  closeModal: () => void;
}

export default function SwipeHeader({ title, closeModal }: Props) {
  return (
    <View
      style={tw`bg-white rounded-t-2xl border-b-2 border-slate-300 px-6 py-3`}
    >
      <View style={tw`mb-5 bg-slate-400 w-12 self-center h-2 rounded-2xl`} />

      <View style={tw`flex-row justify-between items-center mt-2`}>
        {title && <Text fontSize={18}>{title}</Text>}

        <TouchableOpacity onPress={closeModal}>
          <Icon type='Ionicons' name='close' size={24} color={GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
