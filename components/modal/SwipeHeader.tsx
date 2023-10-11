import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { GRAY } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  title?: string;
  closeModal: () => void;
  animationIn?: 'fadeIn' | 'slideInUp';
}

export default function SwipeHeader({ title, closeModal, animationIn }: Props) {
  return (
    <View style={tw.style(`bg-stone-100 rounded-t-2xl`)}>
      {animationIn === 'slideInUp' ? (
        <View
          style={tw.style(
            `border rounded-t-2xl border-slate-300 px-6 pt-3 pb-1`
          )}
        >
          {/* 터치바 */}
          <View
            style={tw`mb-4 bg-slate-500 w-15 self-center h-1.8 rounded-2xl`}
          />

          <View style={tw`flex-row justify-between items-center`}>
            {title && <Text style={tw`text-lg`}>{title}</Text>}
          </View>
        </View>
      ) : (
        <View style={tw`pt-4 pb-2 px-5 flex-row justify-between items-center`}>
          <Text style={tw`text-lg`}>{title}</Text>
          <TouchableOpacity style={tw`px-3 -mr-3`} onPress={closeModal}>
            <Icon type='Ionicons' name='close' size={24} color={GRAY} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
