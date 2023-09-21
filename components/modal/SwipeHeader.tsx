import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { GRAY } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  title?: string;
  closeModal: () => void;
}

export default function SwipeHeader({ title, closeModal }: Props) {
  return (
    <View
      style={tw.style(
        `bg-stone-100 rounded-t-2xl border-b border-slate-300 px-6 py-3`
      )}
    >
      <View style={tw`mb-5 bg-slate-400 w-15 self-center h-2 rounded-2xl`} />

      <View style={tw`flex-row justify-between items-center mt-0`}>
        {title && <Text style={tw`text-lg`}>{title}</Text>}

        <TouchableOpacity onPress={closeModal}>
          <Icon type='Ionicons' name='close' size={23} color={GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
